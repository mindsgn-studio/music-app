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
import {PlayerInterface, Song} from '../@types';

const PlayerContext = createContext<PlayerInterface>({
  isReady: false,
  alltracks: [],
  getAllTracks: () => {},
});

function usePlayer(): any {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

const PlayerProvider = (props: {children: ReactNode}): ReactElement => {
  const [isReady, setIsReady] = useState(false);
  const [alltracks, setAllTracks] = useState<Song[] | string>([]);

  const requestPermission = () => {};

  const getAllTracks = () => {
    getAll({
      coverQuality: 50,
      minSongDuration: 1000,
      sortBy: SortSongFields.ALBUM,
      sortOrder: SortSongOrder.DESC,
    })
      .then(success => {
        setAllTracks(success);
      })
      .catch((error: any) => {
        console.log('error: ', error);
      });
  };

  const sortAlbums = () => {};

  useEffect(() => {
    if (alltracks.length > 0) {
      setIsReady(true);
    }
  }, [alltracks]);

  useEffect(() => {
    getAllTracks();
  }, []);

  return (
    <PlayerContext.Provider
      {...props}
      value={{isReady, alltracks, getAllTracks}}
    />
  );
};

export {PlayerProvider, usePlayer};
