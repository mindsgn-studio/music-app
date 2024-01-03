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
        success.map((track: any) => {
          try {
            realm.write(() => {
              const existingTrack: any = realm
                .objects('tracks')
                .filtered(
                  'artist = $0 AND title = $1',
                  track.artist,
                  track.title,
                )[0];

              if (existingTrack) {
                Object.keys(track).forEach((key: any) => {
                  existingTrack[key] = track[key];
                });
              } else {
                realm.create('tracks', {
                  _id: new Realm.BSON.ObjectId(),
                  ...track,
                });
              }
            });
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
        console.log(
          'Media Location',
          statuses[PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION],
        );
        console.log(
          'External Storage',
          statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE],
        );
        console.log(
          'Read Media',
          statuses[PERMISSIONS.ANDROID.READ_MEDIA_AUDIO],
        );
      })
      .catch((error: any) => {
        setError({
          error: true,
          title: 'Permission Error',
          message: 'Please allow storage & media permission',
        });
      });
  };

  useEffect(() => {
    checkMediaAudioPermission();
  }, []);

  return <PlayerContext.Provider {...props} value={{isReady, error}} />;
};

export {PlayerProvider, usePlayer};
