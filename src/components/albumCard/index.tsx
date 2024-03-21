import React, {useEffect, useState, memo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import styles from './style';
import {useRealm} from '../../context';
import TrackCard from '../trackCard';

const AlbumCard = ({
  goToAlbum,
  goToArtist,
  navigation,
}: {
  goToAlbum: any;
  goToArtist: any;
  navigation: any;
}) => {
  const realm = useRealm();
  const [data, setData] = useState([]);

  useEffect(() => {
    const albumObject: any = realm.objects('Tracks').sorted('album');
    setData(albumObject);
    const albumListener = (event: any[]) => {
      // setData((previousData: any[]) => [...previousData, ...event]);
    };

    albumObject?.addListener(albumListener);

    return () => {
      albumObject?.removeListener(albumListener);
    };
  }, [realm]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{'Tracks'}</Text>
      <View>
        <FlatList
          data={data}
          keyExtractor={item => item._id}
          ListFooterComponent={<View style={{height: 100}} />}
          initialNumToRender={5}
          onEndReachedThreshold={0.5}
          onEndReached={() => {}}
          ListHeaderComponent={<View />}
          renderItem={track => {
            const {index, item} = track;
            const {_id, cover, artist, title, url} = item;

            return (
              <TrackCard
                songs={data}
                _id={_id}
                artist={artist}
                title={title}
                coverArt={cover}
                link={url}
                index={index}
                local={true}
              />
            );
          }}
          ListEmptyComponent={<View />}
        />
        {/*data.map((track: any) => {
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
        })*/}
      </View>
    </View>
  );
};

export default memo(AlbumCard);
