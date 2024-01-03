import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import {usePlayer} from '../../context';

const Error = () => {
  const {error} = usePlayer();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{error.title}</Text>
    </View>
  );
};

export default Error;
