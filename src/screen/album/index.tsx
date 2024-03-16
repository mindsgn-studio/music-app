import React from 'react';
import styles from './style';
import {HomeCard} from '../../components';
import TrackCard from '../../components/_trackCard';
import Animated from 'react-native-reanimated';

const Album = (props: any) => {
  const {route} = props;
  const {params} = route;
  const {album, tracks} = params;

  return (
    <Animated.ScrollView style={styles.container}>
      <HomeCard
        title={album[0].album}
        artist={album[0].artist}
        cover={album[0].cover}
      />
    </Animated.ScrollView>
  );
};

export default Album;
