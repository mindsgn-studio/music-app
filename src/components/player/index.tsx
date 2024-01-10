import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import TrackPlayer, {
  State,
  useProgress,
  Event,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {usePlayer} from '../../context';

const events = [Event.PlaybackState, Event.PlaybackError];

const Player = () => {
  const [state, setState] = useState<string>('idle');
  const progress = useSharedValue(0);
  const {playerState} = usePlayer();
  const {cover, artist, title} = playerState;
  const [slider, setSlider] = useState<number>(0);
  const {position, buffered, duration} = useProgress();

  useTrackPlayerEvents(events, event => {
    if (event.type === Event.PlaybackError) {
    }
    if (event.type === Event.PlaybackState) {
      setState(event.state);
    }
  });

  useEffect(() => {
    setSlider((position / duration) * 100);
  }, [position, buffered, duration]);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
    };
  }, []);

  useEffect(() => {
    if (state == 'playing') {
      progress.value = withTiming(1, {duration: 500});
    }
  }, [state]);

  return (
    <Animated.View style={[styles.container, reanimatedStyle]}>
      <View
        style={[
          styles.slider,
          {
            width: `${slider}%`,
          },
        ]}
      />
      <View style={styles.blurContainer}>
        <View style={styles.detailsContainer}>
          {cover ? (
            <Image source={{uri: cover}} style={styles.imageContainer} />
          ) : (
            <></>
          )}

          <View style={styles.textContainer}>
            <Text numberOfLines={1} style={styles.artistText}>
              {artist}
            </Text>
            <Text numberOfLines={1} style={styles.titleText}>
              {title}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            state === State.Playing ? TrackPlayer.pause() : TrackPlayer.play()
          }>
          <Icon
            name={state === State.Playing ? 'pause' : 'play'}
            size={25}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default Player;
