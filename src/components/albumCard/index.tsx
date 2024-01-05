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

const AlbumCard = ({
  goToAlbum,
  goToArtist,
}: {
  goToAlbum: any;
  goToArtist: any;
}) => {
  const realm = useRealm();
  const [data, setData] = useState([]);

  useEffect(() => {
    const albumResponse: any = realm.objects('Albums');
    if (albumResponse.length === 0) {
    } else {
      setData(albumResponse);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{'Albums'}</Text>
      <View>
        {data.map((track: any) => {
          return (
            <View style={styles.card} key={track._id}>
              <TouchableOpacity
                onPress={() => {
                  goToAlbum(track.album);
                }}>
                <ImageBackground
                  style={styles.image}
                  source={{uri: `file://${track.cover}`}}
                  resizeMode="cover"
                />
              </TouchableOpacity>

              <View style={styles.detailsContainer}>
                <TouchableOpacity
                  onPress={() => {
                    goToAlbum(track.album);
                  }}>
                  <Text style={styles.albumText}>{track.album}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={goToArtist}>
                  <Text style={styles.artistText}>{track.artist}</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default AlbumCard;
