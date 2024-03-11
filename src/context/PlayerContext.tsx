import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {PlayerInterface, PlayerStateInterface} from '../@types/types';
import {useRealm} from './realmContext';

import {
  requestMultiple,
  checkMultiple,
  PERMISSIONS,
} from 'react-native-permissions';
import RNFS from 'react-native-fs';
import {NativeModules} from 'react-native';
import TrackPlayer, {Capability} from 'react-native-track-player';

const {Player} = NativeModules;

const PlayerContext = createContext<any>({
  isReady: false,
  play: () => {},
  addTrack: () => {},
  removeTrack: () => {},
  searchTracks: () => {},
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

const PlayerProvider = (props: {children: ReactNode}): any => {
  const realm = useRealm();
  const [playerState, setPlayerState] = useState<PlayerStateInterface>({
    artist: null,
    title: null,
    cover: null,
    state: 'idle',
  });
  const [isReady, setIsReady] = useState<boolean>(false);
  const [songs, setSongs] = useState([]);

  const deleteTracks = async (collection: string) => {
    try {
      realm.write(() => {
        const tracksToDelete = realm.objects(collection);

        realm.delete(tracksToDelete);
      });

      console.log(`${collection} deleted successfully.`);
    } catch (error: any) {
      console.error('Error deleting Tracks:', error);
    }
  };

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

  const split = (inputString: string) => {
    try {
      const parts = inputString.split('/');
      if (!parts[0]) {
        parts[0] = '1';
      }

      if (!parts[1]) {
        parts[1] = '1';
      }

      return [parseInt(parts[0]), parseInt(parts[1])];
    } catch (error: any) {
      return [parseInt('1'), parseInt('1')];
    }
  };

  const AddToDatabase = async (metadata: any) => {
    try {
      console.log(metadata);

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
            trackNumber: split(metadata.trackNumber)[0],
            discNumber: split(metadata.discNumber)[0],
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
    } catch (error: any) {
      console.error('Error:', error);
    }
  };

  const getAllFiles = () => {
    try {
      let startDirectory = RNFS.DownloadDirectoryPath;
      crawlDirectories(startDirectory)
        .then((mp3Files: any) => {
          console.log('files', mp3Files);
          if (mp3Files.length !== 0) {
            getMetadata(mp3Files);
          }
        })
        .catch(error => {
          console.error(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const checkMediaAudioPermission = async () => {
    //await deleteTracks('Tracks');
    //await deleteTracks('Albums');
    //await deleteTracks('Artists');

    checkMultiple([
      PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.READ_MEDIA_AUDIO,
    ]).then(statuses => {
      if (statuses[PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION] === 'denied') {
        requestMediaAudioPermission();
        return;
      } else if (
        statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === 'denied'
      ) {
        requestMediaAudioPermission();
        return;
      } else if (statuses[PERMISSIONS.ANDROID.READ_MEDIA_AUDIO] === 'denied') {
        requestMediaAudioPermission();
        return;
      }

      getAllFiles();
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
          return;
        } else if (
          statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === 'denied'
        ) {
          requestMediaAudioPermission();
          return;
        } else if (
          statuses[PERMISSIONS.ANDROID.READ_MEDIA_AUDIO] === 'denied'
        ) {
          requestMediaAudioPermission();
          return;
        }
        getAllFiles();
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const getMetadata = async (mp3Files: string[]) => {
    await mp3Files.map(async (file: any) => {
      await Player.getMetadata(file, async (err: any, metadata: any) => {
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
    } catch (error: any) {}
  };

  const play = async () => {
    try {
      console.log('playing');
      TrackPlayer.play();
    } catch (error) {
      console.log(error);
    }
  };

  const addTrack = async (tracks: any[]) => {
    try {
      await TrackPlayer.pause();
      await TrackPlayer.reset();

      const queue = await TrackPlayer.getQueue();

      queue.map(async (track: any, trackIndex: number) => {
        await TrackPlayer.remove([trackIndex]);
      });

      await TrackPlayer.add([...tracks]);

      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],

        compactCapabilities: [Capability.Play, Capability.Pause],
      });

      await TrackPlayer.play();
    } catch (error: any) {
      console.log(error);
    }
  };

  const removeTrack = async () => {};

  const searchTracks = async (search?: string, page?: number) => {
    let link = 'http://mixo.mindsgn.studio/api';

    if (search && search != '') {
      link += `?search=${encodeURIComponent(search)}&page=${encodeURIComponent(
        page,
      )}&`;
    }

    if (!search) {
      link += '/random';
    }

    const response = await fetch(link);

    if (response.ok) {
      const data = await response.json();
      const {tracks} = data;
      setSongs(tracks);
    }
  };

  useEffect(() => {
    checkMediaAudioPermission();
    setupPlayer();
    searchTracks();
  }, [isReady]);

  return (
    <PlayerContext.Provider
      {...props}
      value={{
        isReady,
        addTrack,
        removeTrack,
        play,
        playerState,
        songs,
        searchTracks,
      }}
    />
  );
};

export {PlayerProvider, usePlayer};
