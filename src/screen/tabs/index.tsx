import React, {memo} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../home';
import Search from '../search';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {View} from 'react-native';
import styles from './style';

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
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
            <View style={styles.tabItem}>
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
            <View style={styles.tabItem}>
              <Icon
                name="search"
                size={focused ? 25 : 20}
                color={focused ? 'white' : 'gray'}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default memo(Tabs);
