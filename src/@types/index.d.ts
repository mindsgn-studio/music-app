declare module 'react-native-vector-icons/FontAwesome5';

export interface Song {
  duration: number;
  genre: string;
  title: string;
  url: string;
  cover: string;
  artist: string;
  album: string;
}

export interface PlayerInterface {
  isReady: boolean;
  alltracks: Song[] | string;
  getAllTracks: () => void;
}

export {Song, PlayerInterface};
