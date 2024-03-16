import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';

const DisclaimerCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Disclaimer: All music on this site are for app use only. We do not sell
        music. We do not claim any special rights to any music. If you have a
        copyrighted music on our site that you wish to take down, please send us
        an email on mixo@mindsgn.studio.
      </Text>
    </View>
  );
};

export default DisclaimerCard;
