/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, memo} from 'react';
import {View, TouchableOpacity} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import TrackPlayer, {
  Event,
  useTrackPlayerEvents,
} from 'react-native-track-player';

const events = [Event.PlaybackState, Event.PlaybackError];

const Player = () => {
  const [state, setState] = useState<string>('idle');
  const progress = useSharedValue(0);
  const bottomSheetY = useSharedValue(-100);

  useTrackPlayerEvents(events, event => {
    if (event.type === Event.PlaybackError) {
    }
    if (event.type === Event.PlaybackState) {
      setState(`${event.state}`);
    }
  });

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      bottom: bottomSheetY.value,
    };
  }, []);

  useEffect(() => {
    if (state === 'playing') {
      progress.value = withTiming(1, {duration: 500});
      bottomSheetY.value = withTiming(5, {duration: 500});
    }
  }, [state]);

  return (
    <Animated.View style={[styles.container, reanimatedStyle]}>
      <View style={styles.playerContainer}>
        <TouchableOpacity
          onPress={() => {
            TrackPlayer.skipToPrevious();
          }}>
          <Icon name={'step-backward'} size={25} color="#FF522D" />
        </TouchableOpacity>

        {state === 'playing' ? (
          <TouchableOpacity
            onPress={() => {
              TrackPlayer.pause();
            }}>
            <Icon name={'pause'} size={25} color="#FF522D" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              TrackPlayer.play();
            }}>
            <Icon name={'play'} size={25} color="#FF522D" />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => {
            TrackPlayer.skipToNext();
          }}>
          <Icon name={'step-forward'} size={25} color="#FF522D" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default memo(Player);
