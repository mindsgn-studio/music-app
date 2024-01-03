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
  error: any;
}

export interface Error {
  error: boolean;
  message: string;
}

export {Song, PlayerInterface};
