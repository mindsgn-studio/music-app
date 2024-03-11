import React from 'react';
import {Search, Loading} from './src/screen';
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
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              width: '100%',
              backgroundColor: 'black',
            }}>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}>
                <Stack.Screen name="Loading" component={Loading} />
                <Stack.Screen name="Search" component={Search} />
              </Stack.Navigator>
            </NavigationContainer>
            <Player />
          </SafeAreaView>
        </SafeAreaProvider>
      </PlayerProvider>
    </RealmProvider>
  );
};

export default App;
