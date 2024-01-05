import React from 'react';
import {ScrollView} from 'react-native';
import styles from './style';
import {AlbumCard} from '../../components';
import Realm from 'realm';

const Home = (props: any) => {
  const realm = Realm();
  const {navigation} = props;

  const goToAlbum = (album: string) => {
    navigation.navigate('Album', {});
  };

  const goToArtist = (artist: string) => {
    navigation.navigate('Artist', {});
  };

  return (
    <ScrollView style={styles.container}>
      <AlbumCard goToAlbum={goToAlbum} goToArtist={goToArtist} />
    </ScrollView>
  );
};

export default Home;
