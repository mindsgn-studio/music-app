import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {PlayerInterface, PlayerStateInterface} from '../@types/types';
import {useRealm} from './trackContext';
import {
  requestMultiple,
  checkMultiple,
  PERMISSIONS,
} from 'react-native-permissions';
import RNFS from 'react-native-fs';
import {NativeModules} from 'react-native';
import TrackPlayer, {State} from 'react-native-track-player';
const {Player} = NativeModules;

const PlayerContext = createContext<PlayerInterface>({
  isReady: false,
  error: false,
  play: () => {},
  addTrack: () => {},
  removeTrack: () => {},
  playerState: {
    artist: null,
    title: null,
    cover: null,
    state: 'idle',
  },
});

function usePlayer(): any {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within an PlayerProvider');
  }
  return context;
}

const PlayerProvider = (props: {children: ReactNode}): ReactElement => {
  const realm = useRealm();
  const [error, setError] = useState<any>({
    error: false,
    message: '',
  });
  const [playerState, setPlayerState] = useState<PlayerStateInterface>({
    artist: null,
    title: null,
    cover: null,
    state: 'idle',
  });
  const [isReady, setIsReady] = useState<boolean>(false);

  const crawlDirectories = async (directory: any) => {
    try {
      const files: any = await RNFS.readDir(directory);
      const mp3Files: any = files
        .filter((file: any) => file.isFile() && file.name.endsWith('.mp3'))
        .map((mp3File: any) => mp3File.path);

      const subdirectories = files.filter((file: any) => file.isDirectory());

      for (const subdirectory of subdirectories) {
        const subdirectoryMp3Files = await crawlDirectories(subdirectory.path);
        mp3Files.push(...subdirectoryMp3Files);
      }

      return mp3Files;
    } catch (error: any) {
      return [];
    }
  };

  const saveBase64AsImage = async (
    base64String: string,
    filename: string,
  ): Promise<string | null> => {
    const path = RNFS.DocumentDirectoryPath + `/${filename}.png`;

    try {
      const exists = await RNFS.exists(path);

      if (exists) {
        return path;
      }

      await RNFS.writeFile(path, base64String, 'base64');
      return path;
    } catch (error) {
      return null;
    }
  };

  const AddToDatabase = async (metadata: any) => {
    try {
      const path = await saveBase64AsImage(
        metadata.cover,
        `${metadata.artist}-${metadata.album}`,
      );

      const tracks = realm
        .objects('Tracks')
        .filtered(
          'artist = $0 AND title = $1',
          metadata.artist,
          metadata.title,
        );

      if (tracks.length === 0) {
        realm.write(() => {
          realm.create('Tracks', {
            _id: new Realm.BSON.ObjectId(),
            artist: metadata.artist,
            title: metadata.title,
            album: metadata.album,
            url: metadata.url,
            cover: path,
            duration: metadata.duration ? parseInt(metadata.duration) : null,
            createdAt: new Date(),
          });
        });
      }

      const artist = realm
        .objects('Artists')
        .filtered('artist = $0', metadata.albumArtist);

      if (artist.length === 0) {
        realm.write(() => {
          realm.create('Artists', {
            _id: new Realm.BSON.ObjectId(),
            artist: metadata.albumArtist,
            profile: path,
            createdAt: new Date(),
          });
        });
      }

      const album = realm
        .objects('Albums')
        .filtered('album = $0', metadata.album);

      if (album.length === 0) {
        realm.write(() => {
          realm.create('Albums', {
            _id: new Realm.BSON.ObjectId(),
            artist: metadata.albumArtist,
            album: metadata.album,
            year: metadata.year ? parseInt(metadata.year) : null,
            cover: path,
            createdAt: new Date(),
          });
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getAllFiles = () => {
    let startDirectory = RNFS.ExternalStorageDirectoryPath;
    crawlDirectories(startDirectory)
      .then(mp3Files => {
        if (mp3Files.length !== 0) {
          getMetadata(mp3Files);
        }
      })
      .catch((error: any) => {
        console.error('Error:', error);
      });
  };

  const checkMediaAudioPermission = () => {
    checkMultiple([
      PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.READ_MEDIA_AUDIO,
    ]).then(statuses => {
      if (statuses[PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION] === 'denied') {
        requestMediaAudioPermission();
      } else if (
        statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === 'denied'
      ) {
        requestMediaAudioPermission();
      } else if (statuses[PERMISSIONS.ANDROID.READ_MEDIA_AUDIO] === 'denied') {
        requestMediaAudioPermission();
      } else {
        getAllFiles();
      }
    });
  };

  const requestMediaAudioPermission = () => {
    requestMultiple([
      PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.READ_MEDIA_AUDIO,
    ])
      .then(statuses => {
        if (statuses[PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION] === 'denied') {
          requestMediaAudioPermission();
        } else if (
          statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === 'denied'
        ) {
          requestMediaAudioPermission();
        } else if (
          statuses[PERMISSIONS.ANDROID.READ_MEDIA_AUDIO] === 'denied'
        ) {
          requestMediaAudioPermission();
        } else {
          getAllFiles();
        }
      })
      .catch((error: any) => {
        setError({
          error: true,
          title: 'Permission Error',
          message: 'Please allow storage & media permission',
        });
      });
  };

  const getMetadata = async (mp3Files: string[]) => {
    await mp3Files.map(async (file: any) => {
      await Player.getMetadata(file, async (err, metadata) => {
        if (err) {
          console.log(err);
          return;
        }

        const data = {
          ...metadata,
          url: file,
        };

        await AddToDatabase(data);
      });
    });

    setTimeout(() => {
      setIsReady(true);
    }, 10000);
  };

  const setupPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
    } catch (error) {}
  };

  const play = async () => {
    try {
      console.log('playing');
      TrackPlayer.play();
    } catch (error) {
      console.log(error);
    }
  };

  const addTrack = async (track: any) => {
    try {
      const data = {
        url: `file://${track.url}`,
        title: track.title,
        artist: track.artist,
        artwork: `file://${track.cover}`,
        duration: track.duration,
      };

      setPlayerState({
        ...playerState,
        artist: track.artist,
        title: track.title,
        cover: `file://${track.cover}`,
      });

      const state = await TrackPlayer.getState();

      if (state === State.Playing || state === State.Paused) {
        await TrackPlayer.reset();
        await TrackPlayer.remove([0]);
        await TrackPlayer.add([data]);
        await TrackPlayer.play();
      }

      await TrackPlayer.add([data]);
      await TrackPlayer.play();
    } catch (error) {
      console.log(error);
    }
  };

  const removeTrack = async () => {};

  useEffect(() => {
    checkMediaAudioPermission();
  }, []);

  useEffect(() => {
    if (isReady) {
      setupPlayer();
    }
  }, [isReady]);

  return (
    <PlayerContext.Provider
      {...props}
      value={{isReady, error, addTrack, removeTrack, play, playerState}}
    />
  );
};

export {PlayerProvider, usePlayer};
