import React from 'react';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {usePlayer} from '../../context';
import {Linking} from 'react-native';

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

  return (
    <TouchableOpacity
      key={`${_id}-${index}`}
      style={styles.trackCard}
      onPress={() => {
        addTrack(songs, index, local);
      }}>
      <ImageBackground
        style={styles.trackImage}
        source={
          local
            ? `file://${coverArt}`
            : {
                uri: coverArt,
              }
        }
      />
      <View>
        <Text numberOfLines={1} style={styles.trackTitle}>
          {`${title}`}
        </Text>
        <Text numberOfLines={1} style={styles.trackArtist}>
          {`${artist}`}
        </Text>
      </View>

      {local ? null : (
        <TouchableOpacity
          onPress={() => Linking.openURL(link)}
          style={{
            marginLeft: 20,
          }}>
          <Icon name={'download'} size={20} color="#FF522D" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default TrackCard;
