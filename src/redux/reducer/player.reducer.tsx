import {PLAY, PAUSE} from './../../constants';

const initialState: any = {
  isPlaying: false,
  artist: '',
  title: '',
  playlist: [],
};

const Player = (state = initialState, action: any) => {
  switch (action.type) {
    case PLAY:
      return {
        ...state,
        artist: action.artist,
        title: action.title,
        isPlaying: true,
      };
    case PAUSE:
      return {
        ...state,
        isPlaying: false,
      };
    default:
      return state;
  }
};

export default Player;
