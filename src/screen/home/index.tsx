import React from 'react';
import {ScrollView} from 'react-native';
import styles from './style';
import {AlbumCard} from '../../components';

const Home = (props: any) => {
  const {navigation} = props;

  console.log(props.navigation.navigation);
  const goToAlbum = () => {
    navigation.navigate('Album');
  };

  const goToArtist = () => {
    navigation.navigate('Artist');
  };

  return (
    <ScrollView style={styles.container}>
      <AlbumCard goToAlbum={goToAlbum} goToArtist={goToArtist} />
    </ScrollView>
  );
};

export default Home;
