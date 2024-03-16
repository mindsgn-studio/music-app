import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './style';

const EmptyCard = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.title}>{'Not Found'}</Text>
      <Text style={styles.text}>
        {
          'Your search did not match any Album, Artist or Song. Please try again.'
        }
      </Text>
    </TouchableOpacity>
  );
};

export default EmptyCard;
