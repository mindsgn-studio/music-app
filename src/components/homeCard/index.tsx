import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';

const HomeCard = ({
  artist,
  title,
  art = '',
}: {
  artist?: string;
  title?: string;
  art?: string;
}) => {
  return (
    <ImageBackground
      style={styles.imageContainer}
      imageStyle={{borderRadius: 15}}
      source={{uri: art}}
      resizeMode="cover">
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 1)']}
        style={styles.buttons}
      />
      <View style={styles.details}>
        <View>
          <View
            style={{
              maxWidth: 250,
            }}>
            <Text numberOfLines={1} style={styles.textTitle}>
              {title}
            </Text>
          </View>
          <View
            style={{
              maxWidth: 100,
            }}>
            <Text numberOfLines={1} style={styles.textArtist}>
              {artist}
            </Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default HomeCard;
