import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import {usePlayer} from '../../context';
import RNRestart from 'react-native-restart';

const Error = () => {
  const {error} = usePlayer();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{error.title}</Text>
      <TouchableOpacity
        onPress={() => {
          RNRestart.restart();
        }}>
        <Text style={styles.text}>{}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Error;
