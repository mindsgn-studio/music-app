import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStore, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';

import Player from '../reducer';

const persistConfig = {
  key: 'persistedReducer',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  Player,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

export {store, persistor};
