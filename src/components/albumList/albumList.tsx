import React from 'react';
import {View, FlatList} from 'react-native';
import AlbumCard from '../albumCard/albumCard';
import styles from './style';

const AlbumList = ({data}: {data: any}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        onEndReachedThreshold={90}
        renderItem={({item}) => {
          console.log(item);
          return (
            <AlbumCard
              artist={item.artist}
              art={item.cover}
              title={item.album}
            />
          );
        }}
      />
    </View>
  );
};

export default AlbumList;
