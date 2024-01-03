import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import styles from './style';
import {useRealm} from '../../context';

const AlbumCard = () => {
  const realm = useRealm();
  const [data, setData] = useState([]);

  useEffect(() => {
    const albumResponse: any = realm.objects('Albums');
    if (albumResponse.length === 0) {
    } else {
      console.log(albumResponse);
      setData(albumResponse);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{'Albums'}</Text>
      <View style={styles.cardRow}>
        {data.map((track: any) => {
          return (
            <TouchableOpacity style={styles.card}>
              <ImageBackground
                style={styles.image}
                source={{uri: track.cover}}
                resizeMode="cover"
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default AlbumCard;
