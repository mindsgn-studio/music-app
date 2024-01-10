import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import {usePlayer} from '../../context';

const TrackCard = ({tracks}: {tracks: any[]}) => {
  const [trackList, setTrackList] = useState(tracks);
  const {addTrack} = usePlayer();

  const customSort = (trackA, trackB) => {
    if (
      !trackA ||
      !trackB ||
      trackA.discNumber === undefined ||
      trackB.discNumber === undefined ||
      trackA.trackNumber === undefined ||
      trackB.trackNumber === undefined
    ) {
      return 0;
    }

    if (trackA.discNumber !== trackB.discNumber) {
      return trackA.discNumber - trackB.discNumber;
    }

    return trackA.trackNumber - trackB.trackNumber;
  };

  useEffect(() => {
    if (tracks.length >= 1) {
      const validTracks = tracks.filter(track => typeof track === 'object');
      const sortedTracks = validTracks.sort(customSort);
      setTrackList(sortedTracks);
    }
  }, [tracks]);

  return (
    <View style={styles.container}>
      {trackList.map((track: any) => {
        return (
          <TouchableOpacity
            style={styles.card}
            key={track._id}
            onPress={() => addTrack(track)}>
            <View style={styles.detailsContainer}>
              <Text style={styles.albumText}>{track.trackNumber}</Text>
            </View>
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
