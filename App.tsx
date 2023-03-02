import React from 'react';
import {Home, Album, Artist} from './src/screen';
import {SafeAreaView, StatusBar} from 'react-native';
import {Player} from './src/components';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {store, persistor} from './src/redux/store';

StatusBar.setHidden(true);

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Album" component={Album} />
              <Stack.Screen name="Artist" component={Artist} />
            </Stack.Navigator>
          </NavigationContainer>
          <Player />
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
};

export default App;
