import React from 'react';
import {ScrollView} from 'react-native';
import styles from './style';
import {AlbumCard} from '../../components';
import {useRealm} from '../../context';

const Home = (props: any) => {
  const realm = useRealm();
  const {navigation} = props;

  const goToAlbum = (album: any) => {
    const trackData = realm.objects('Tracks').filtered('album = $0', album);
    const albumData = realm.objects('Albums').filtered('album = $0', album);

    if (albumData.length >= 1) {
      const data = {
        ...trackData,
        ...albumData,
      };

      navigation.navigate('Album', data);
    } else {
      console.warn(`Album not found: ${album}`);
    }
  };

  const goToArtist = (artist: any) => {
    const artistData = realm.objects('Artists').filtered('artist = $0', artist);

    if (artistData.length >= 1) {
      const data = {
        ...artistData,
      };

      navigation.navigate('Artist', data);
    } else {
      console.warn(`Artist not found: ${artist}`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <AlbumCard goToAlbum={goToAlbum} goToArtist={goToArtist} />
    </ScrollView>
  );
};

export default Home;
