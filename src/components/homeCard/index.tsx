import React, {useState, useEffect} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import {useRealm} from '../../context';

const HomeCard = () => {
  const realm = useRealm();
  const [data, setData] = useState({
    cover: '',
    title: '',
    artist: '',
  });

  useEffect(() => {
    const historyResponse: any = realm.objects('History');
    if (historyResponse.length === 0) {
      const response: any = realm.objects('Tracks');
      if (response.length === 0) {
        return undefined;
      }

      const randomNumber: number = Math.floor(
        Math.random() * (response.length - 1),
      );
      setData(response[randomNumber]);
    }
  }, []);

  return (
    <ImageBackground
      style={styles.imageContainer}
      imageStyle={{borderRadius: 15}}
      source={{uri: data.cover}}
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
              {data.title}
            </Text>
          </View>
          <View
            style={{
              maxWidth: 100,
            }}>
            <Text numberOfLines={1} style={styles.textArtist}>
              {data.artist}
            </Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default HomeCard;
