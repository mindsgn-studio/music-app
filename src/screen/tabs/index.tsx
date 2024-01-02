import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../home';
import Search from '../search';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {View} from 'react-native';
import styles from './style';
import {Player} from '../../components';

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            ...styles.tab,
          },
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  padding: 10,
                  borderRadius: 50,
                }}>
                <Icon
                  name="home"
                  size={focused ? 25 : 20}
                  color={focused ? 'white' : 'gray'}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  padding: 10,
                  borderRadius: 50,
                }}>
                <Icon
                  name="search"
                  size={focused ? 25 : 20}
                  color={focused ? 'white' : 'gray'}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="My Playlist"
          component={Search}
          options={{
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  padding: 10,
                  borderRadius: 50,
                }}>
                <Icon
                  name="bookmark"
                  size={focused ? 25 : 20}
                  color={focused ? 'white' : 'gray'}
                />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
      <Player />
    </>
  );
}

export default Tabs;
