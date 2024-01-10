export interface Song {
  duration: number;
  genre: string;
  title: string;
  url: string;
  cover: string;
  artist: string;
  album: string;
}

export interface PlayerStateInterface {
  title?: string | null;
  url?: string | null;
  cover?: string | null;
  artist?: string | null;
  album?: string | null;
  state: string;
}

export interface PlayerInterface {
  isReady: boolean;
  error: any;
  play: any;
  addTrack: any;
  removeTrack: any;
  playerState: PlayerStateInterface;
}

export interface Error {
  error: boolean;
  message: string;
}

export {Song, PlayerInterface, PlayerStateInterface};
