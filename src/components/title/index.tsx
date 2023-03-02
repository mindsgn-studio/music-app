import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';

const Title = ({text}: {text: string}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{text}</Text>
    </View>
  );
};

export default Title;
