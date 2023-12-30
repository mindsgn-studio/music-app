import React from 'react';
import {Tabs, Loading, Error} from './src/screen';
import {SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PlayerProvider} from './src/context';

StatusBar.setHidden(true);
const Stack = createNativeStackNavigator();

const App = () => {
  return (
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
              <Stack.Screen name="Tabs" component={Tabs} />
              <Stack.Screen name="Error" component={Error} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </PlayerProvider>
  );
};

export default App;
