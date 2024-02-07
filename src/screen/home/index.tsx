import React from 'react';
import styles from './style';
import {AlbumCard} from '../../components';
import {useRealm} from '../../context';
import Animated from 'react-native-reanimated';

const Home = (props: any) => {
  const realm = useRealm();
  const {navigation} = props;

  const goToAlbum = (album: string) => {
    try {
      const queryResponse: any = realm
        .objects('Tracks')
        .filtered('album == $0', `${album}`)
        .sorted('discNumber');

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

  return (
    <Animated.ScrollView style={styles.container}>
      <AlbumCard goToAlbum={goToAlbum} goToArtist={() => {}} />
    </Animated.ScrollView>
  );
};

export default Home;
