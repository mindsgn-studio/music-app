import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import styles from './style';
import Title from '../title';
import PlayerAction from '../../redux/actions';

const HorizontalScroll = ({
  text,
  data = [],
  props,
}: {
  text: string;
  data: any;
  props: any;
}) => {
  const {play} = PlayerAction(props);
  return (
    <View style={styles.container}>
      <View>
        <Title text={text} />
      </View>
      <ScrollView horizontal={true} style={styles.scrollContainer}>
        {data.map((track: any) => {
          return (
            <TouchableOpacity
              onPress={() => play(track.user.handle, track.title)}
              key={track.id}
              style={styles.card}>
              <ImageBackground
                source={{uri: `${track.artwork['150x150']}`}}
                style={styles.cardImage}>
                <View style={styles.cardDetails}>
                  <Text style={styles.cardTitle}>
                    {track.title.substring(0, 20)}
                  </Text>
                  <Text style={styles.cardHandle}>{track.user.handle}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default HorizontalScroll;
