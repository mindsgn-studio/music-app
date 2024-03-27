import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {usePlayer} from '../../context';
import {Linking} from 'react-native';
import TrackPlayer, {
  Event,
  useTrackPlayerEvents,
} from 'react-native-track-player';

const TrackCard = ({
  songs,
  index,
  _id,
  coverArt,
  title,
  artist,
  link,
  local = false,
}: {
  songs: any;
  index: number;
  _id: string;
  coverArt: string;
  title: string;
  artist: string;
  link: string;
  local: boolean;
}) => {
  const {addTrack} = usePlayer();
  const [current, setCurrent] = useState<null | number>(null);
  const events = [Event.PlaybackState, Event.PlaybackError];

  const updateCurrentTrack = async () => {
    const track = await TrackPlayer.getCurrentTrack();
    setCurrent(track);
  };

  useTrackPlayerEvents(events, event => {
    if (event.type === Event.PlaybackError) {
    }
    if (event.type === Event.PlaybackState) {
      updateCurrentTrack();
    }
  });

  return (
    <TouchableOpacity
      key={`${_id}-${index}`}
      style={styles.trackCard}
      onPress={() => {
        addTrack(songs, index, local);
      }}>
      <ImageBackground style={styles.trackImage} source={{uri: coverArt}} />
      <View>
        <Text
          numberOfLines={1}
          style={[
            styles.trackTitle,
            {
              color:
                index === current
                  ? 'rgba(255, 82, 42, 1)'
                  : 'rgba(255, 255, 255, 1)',
            },
          ]}>
          {`${title}`}
        </Text>
        <Text
          numberOfLines={1}
          style={[
            styles.trackArtist,
            {
              color:
                index === current
                  ? 'rgba(255, 82, 42, 0.8)'
                  : 'rgba(255, 255, 255, 0.5)',
            },
          ]}>
          {`${artist}`}
        </Text>
      </View>

      {/*local ? null : (
        <TouchableOpacity
          onPress={() => Linking.openURL(link)}
          style={{
            marginLeft: 20,
          }}>
          <Icon name={'download'} size={20} color="#FF522D" />
        </TouchableOpacity>
      )*/}
    </TouchableOpacity>
  );
};

export default TrackCard;
