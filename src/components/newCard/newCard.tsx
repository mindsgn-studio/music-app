import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';

const NewCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{'Recent'}</Text>
      <View style={styles.container}>
        <View style={styles.container} />
        <View style={styles.container} />
        <View style={styles.container} />
      </View>
    </View>
  );
};

export default NewCard;
