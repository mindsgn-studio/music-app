import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import styles from './style';
import {useRealm} from '../../context';

const TrackCard = ({tracks}: {tracks: any}) => {
  return (
    <View style={styles.container}>
      {tracks.map((track: any) => {
        return (
          <View style={styles.card} key={track._id}>
            <View style={styles.detailsContainer}>
              <TouchableOpacity>
                <Text style={styles.albumText}>{track.title}</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.artistText}>{track.artist}</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default TrackCard;
