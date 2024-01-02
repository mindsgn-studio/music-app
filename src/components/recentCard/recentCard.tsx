import React from 'react';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import styles from './style';
import {usePlayer} from '../../context';

const RecentCard = () => {
  const {alltracks} = usePlayer();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{'Recent'}</Text>
      <View style={styles.cardRow}>
        <TouchableOpacity style={styles.card}>
          <ImageBackground
            style={styles.image}
            source={{uri: alltracks[11].cover}}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <ImageBackground
            style={styles.image}
            source={{uri: alltracks[10].cover}}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <ImageBackground
            style={styles.image}
            source={{uri: alltracks[10].cover}}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RecentCard;
