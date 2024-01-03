import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  getAll,
  SortSongFields,
  SortSongOrder,
} from 'react-native-get-music-files';
import {PlayerInterface} from '../@types';
import TrackPlayer from 'react-native-track-player';
import {useRealm} from './trackContext';
import {
  requestMultiple,
  checkMultiple,
  PERMISSIONS,
} from 'react-native-permissions';
import RNFS from 'react-native-fs';

const PlayerContext = createContext<PlayerInterface>({
  isReady: false,
  error: false,
});

function usePlayer(): any {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

const PlayerProvider = (props: {children: ReactNode}): ReactElement => {
  const realm = useRealm();
  const [error, setError] = useState<any>({
    error: false,
    message: '',
  });
  const [isReady, setIsReady] = useState<boolean>(false);
  const [trackPlayer, setTrackPlayer] = useState<any>(null);

  const setupTrackPlayer = async () => {
    try {
      const response = await TrackPlayer.setupPlayer();
      setTrackPlayer(response);
    } catch (error) {}
  };

  const getAllTracks = () => {
    getAll({
      coverQuality: 50,
      minSongDuration: 1000,
      sortBy: SortSongFields.ALBUM,
      sortOrder: SortSongOrder.DESC,
    })
      .then((success: any) => {
        success.map(async (track: any) => {
          try {
            realm.write(() => {
              const existingTrack: any = realm
                .objects('Tracks')
                .filtered(
                  'artist = $0 AND title = $1',
                  track.artist,
                  track.title,
                );

              if (existingTrack.length === 0) {
                let song = {
                  _id: new Realm.BSON.ObjectId(),
                  createdAt: new Date(),
                  url: track.url,
                  title: track.title,
                  duration: track.duration,
                  album: track.album,
                  artist: track.artist,
                  cover: track.cover,
                };

                const newTrack = realm.create('Tracks', {...song});
                console.log('Track: ', newTrack);
              }

              const existingArtist: any = realm
                .objects('Artists')
                .filtered('artist = $0', track.artist);

              if (existingArtist.length === 0) {
                let artist: any = {
                  _id: new Realm.BSON.ObjectId(),
                  artist: track.artist,
                  createdAt: new Date(),
                };

                const newArtist = realm.create('Artists', {...artist});
                console.log('Artist: ', newArtist);
              }

              const existingAlbum: any = realm
                .objects('Albums')
                .filtered('album = $0', track.album);

              if (existingAlbum.length === 0) {
                let album: any = {
                  _id: new Realm.BSON.ObjectId(),
                  album: track.album,
                  artist: track.artist,
                  createdAt: new Date(),
                  cover: track.cover,
                };

                const newAlbum = realm.create('Albums', {...album});
                console.log('Artist: ', newAlbum);
              }
            });

            setIsReady(true);
            //realm.close();
          } catch (error) {
            console.error('Error inserting track:', error);
          }
        });
      })
      .catch((error: any) => {
        setError({
          error: true,
          title: 'Reading Error',
          message: '',
        });
      });
  };

  const checkMediaAudioPermission = () => {
    checkMultiple([
      PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.READ_MEDIA_AUDIO,
    ]).then(statuses => {
      console.log(statuses[PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION]);

      if (statuses[PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION] === 'denied') {
        requestMediaAudioPermission();
      }

      if (statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === 'denied') {
        requestMediaAudioPermission();
      }

      if (statuses[PERMISSIONS.ANDROID.READ_MEDIA_AUDIO] === 'denied') {
        requestMediaAudioPermission();
      }

      getAllTracks();
    });
  };

  const requestMediaAudioPermission = () => {
    requestMultiple([
      PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.READ_MEDIA_AUDIO,
    ])
      .then(statuses => {
        getAllTracks();
      })
      .catch((error: any) => {
        setError({
          error: true,
          title: 'Permission Error',
          message: 'Please allow storage & media permission',
        });
      });
  };

  const crawlDirectories = async (directory: any) => {
    try {
      const files = await RNFS.readDir(directory);
      const mp3Files = files
        .filter(file => file.isFile() && file.name.endsWith('.mp3'))
        .map(mp3File => mp3File.path);

      const subdirectories = files.filter(file => file.isDirectory());
      console.log(subdirectories);
      for (const subdirectory of subdirectories) {
        const subdirectoryMp3Files = await crawlDirectories(subdirectory.path);
        mp3Files.push(...subdirectoryMp3Files);
      }

      return mp3Files;
    } catch (error) {
      console.error('Error crawling directories:', error);
      return [];
    }
  };

  useEffect(() => {
    let startDirectory = RNFS.ExternalStorageDirectoryPath;
    crawlDirectories(startDirectory)
      .then(mp3Files => {
        console.log('local storage MP3 files:', mp3Files);
      })
      .catch((error: any) => {
        console.error('Error:', error);
      });
  }, []);

  return <PlayerContext.Provider {...props} value={{isReady, error}} />;
};

export {PlayerProvider, usePlayer};
