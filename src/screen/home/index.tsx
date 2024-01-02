import React from 'react';
import {View} from 'react-native';
import styles from './style';
import {usePlayer} from '../../context';
import {HomeCard, RecentCard} from '../../components';

const Home = () => {
  const {alltracks} = usePlayer();

  return (
    <View style={styles.container}>
      <HomeCard
        title={alltracks[0].title}
        artist={alltracks[0].artist}
        art={alltracks[0].cover}
      />
      <RecentCard />
    </View>
  );
};

export default Home;
