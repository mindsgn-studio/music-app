import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {PlayerInterface} from '../@types/types';
import {useRealm} from './trackContext';
import {
  requestMultiple,
  checkMultiple,
  PERMISSIONS,
} from 'react-native-permissions';
import RNFS from 'react-native-fs';
import {NativeModules} from 'react-native';
const {Player} = NativeModules;

const PlayerContext = createContext<PlayerInterface>({
  isReady: false,
  error: false,
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
  const [isReady, setIsReady] = useState<boolean>(false);
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    Player.play('Aman', (err, msg) => {
      if (err) {
        console.log('player: ', err);
        return;
      }
      console.log(msg);
    });
  }, []);

  /*
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
    });
  };

  const requestMediaAudioPermission = () => {
    requestMultiple([
      PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.READ_MEDIA_AUDIO,
    ])
      .then(statuses => {})
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

  const mp3ToBlob = async filePath => {};

  const getFileMetaData = async file => {
    try {
      console.log(file);
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    let startDirectory = RNFS.ExternalStorageDirectoryPath;
    crawlDirectories(startDirectory)
      .then(mp3Files => {
        if (mp3Files.length !== 0) {
          setFiles(mp3Files);
        }
      })
      .catch((error: any) => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    if (files.length !== 0) {
      files.map(file => {
        getFileMetaData(file);
      });
    }
  }, [files]);
  */
  return <PlayerContext.Provider {...props} value={{isReady, error}} />;
};

export {PlayerProvider, usePlayer};
