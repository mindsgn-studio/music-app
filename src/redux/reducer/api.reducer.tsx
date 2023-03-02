import {GET_ALBUMS, GET_ARTIST, GET_GENRE} from './../../constants';

const initialState: any = {
  albums: [],
  artists: [],
  playlists: [],
  genre: [],
};

const API = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_ALBUMS:
      return {
        ...state,
        albums: action.albums,
      };
    case GET_ARTIST:
      return {
        ...state,
        artists: action.artists,
      };
    case GET_GENRE:
      return {
        ...state,
        genre: action.genre,
      };
    default:
      return state;
  }
};

export default API;
