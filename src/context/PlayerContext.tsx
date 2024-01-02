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
import TrackPlayer from 'react-native-track-player';
// import Vasern from 'vasern';

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
  const [isReady, setIsReady] = useState<boolean>(false);
  // const [hasPermission, setHasPermission] = useState<boolean>(false);
  // const [vasernDB, setVasern] = useState<any | null>();
  const [trackPlayer, setTrackPlayer] = useState<any>(null);
  const [alltracks, setAllTracks] = useState<Song[] | string>([]);

  const setupTrackPlayer = async () => {
    try {
      const response = await TrackPlayer.setupPlayer();
      setTrackPlayer(response);
    } catch (error) {}

    setTrackPlayer(true);
  };

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

  useEffect(() => {
    if (alltracks.length > 0 && trackPlayer) {
      setIsReady(true);
    }
  }, [alltracks, trackPlayer]);

  useEffect(() => {
    setupTrackPlayer();
    getAllTracks();
  }, []);

  useEffect(() => {
    /*
      const VasernDB = new Vasern({
        schemas: [
          {
            name: 'tracks',
            props: {
              url: 'string',
              title: 'string',
              genre: 'string',
              duration: 'int',
              album: 'string',
              artist: 'string',
              cover: 'string',
            },
          },
          {
            name: 'recent',
            props: {
              url: 'string',
              title: 'string',
              genre: 'string',
              duration: 'int',
              album: 'string',
              artist: 'string',
              cover: 'string',
            },
          },
          {
            name: 'myplaylist',
            props: {
              url: 'string',
              title: 'string',
              genre: 'string',
              duration: 'int',
              album: 'string',
              artist: 'string',
              cover: 'string',
            },
          },
        ],
      });

    setVasern(VasernDB);
    */
  }, []);

  return (
    <PlayerContext.Provider
      {...props}
      value={{isReady, alltracks, getAllTracks}}
    />
  );
};

export {PlayerProvider, usePlayer};
