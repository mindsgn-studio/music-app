import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import styles from './style';
import {HomeCard} from '../../components';
import TrackCard from '../../components/trackCard';

const Album = props => {
  const {route} = props;
  const {params} = route;
  const {album, tracks} = params;

  return (
    <ScrollView style={styles.container}>
      <HomeCard
        title={album[0].album}
        artist={album[0].artist}
        cover={album[0].cover}
      />
      <TrackCard tracks={tracks} />
    </ScrollView>
  );
};

export default Album;
