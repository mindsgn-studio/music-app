import {PLAY, PAUSE} from '../../constants';
const PlayerAction = (props: any) => {
  const {dispatch} = props;

  const pause = () => {
    dispatch({
      type: PAUSE,
      isPlaying: false,
    });
  };

  const play = (artist: string, title: string) => {
    dispatch({
      type: PLAY,
      isPlaying: true,
      artist: artist,
      title: title,
    });
  };

  const next = () => {};

  return {
    pause,
    play,
    next,
  };
};

export default PlayerAction;
