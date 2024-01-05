import React from 'react';
import {ScrollView} from 'react-native';
import styles from './style';
import {AlbumCard} from '../../components';
import {useRealm} from '../../context';

const Home = (props: any) => {
  const realm = useRealm();
  const {navigation} = props;

  const goToAlbum = (album: string) => {
    try {
      const queryResponse = realm
        .objects('Tracks')
        .filtered('album == $0', `${album}`);

      const queryAlbum = realm
        .objects('Albums')
        .filtered('album == $0', `${album}`);

      const data = {
        tracks: queryResponse,
        album: queryAlbum,
      };

      navigation.navigate({
        name: 'Album',
        params: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const goToArtist = (artist: any) => {};

  return (
    <ScrollView style={styles.container}>
      <AlbumCard goToAlbum={goToAlbum} goToArtist={goToArtist} />
    </ScrollView>
  );
};

export default Home;
