import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';

const Album = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{'album'}</Text>
    </View>
  );
};

export default Album;
