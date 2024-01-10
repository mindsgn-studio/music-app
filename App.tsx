import React from 'react';
import {Tabs, Loading, Error, Home, Album, Artist} from './src/screen';
import {SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PlayerProvider, RealmProvider} from './src/context';
import {Player} from './src/components';
StatusBar.setHidden(true);
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <RealmProvider>
      <PlayerProvider>
        <SafeAreaProvider>
          <SafeAreaView
            style={{
              flex: 1,
            }}>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}>
                <Stack.Screen name="Loading" component={Loading} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Error" component={Error} />
                <Stack.Screen name="Album" component={Album} />
                <Stack.Screen name="Artist" component={Artist} />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaView>
        </SafeAreaProvider>
        <Player />
      </PlayerProvider>
    </RealmProvider>
  );
};

export default App;
