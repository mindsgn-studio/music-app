import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import {usePlayer} from '../../context';

const TrackCard = ({tracks}: {tracks: any}) => {
  const {addTrack} = usePlayer();

  return (
    <View style={styles.container}>
      {tracks.map((track: any) => {
        return (
          <TouchableOpacity
            style={styles.card}
            key={track._id}
            onPress={() => addTrack(track)}>
            <View style={styles.detailsContainer}>
              <Text style={styles.albumText}>{track.title}</Text>

              <Text style={styles.artistText}>{track.artist}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TrackCard;
