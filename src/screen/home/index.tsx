import React from 'react';
import {View} from 'react-native';
import styles from './style';
import {HomeCard, AlbumCard} from '../../components';

const Home = () => {
  return (
    <View style={styles.container}>
      <HomeCard />
      <AlbumCard />
    </View>
  );
};

export default Home;
