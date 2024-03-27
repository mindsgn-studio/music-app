import React from 'react';
import {View} from 'react-native';
import styles from './style';
import {usePlayer} from '../../context';
import {
  DisclaimerCard,
  TrackCard,
  EmptyCard,
  SearchInput,
} from '../../components';
// import {BannerAd, TestIds, BannerAdSize} from 'react-native-google-mobile-ads';
import {FlashList} from '@shopify/flash-list';
const Search = () => {
  const {songs, searchTracks, search, setPage, page} = usePlayer();

  return (
    <View style={styles.container}>
      <SearchInput />
      <FlashList
        data={songs}
        keyExtractor={(item: any) => item._id}
        ListFooterComponent={<View style={{height: 100}} />}
        estimatedItemSize={20}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          searchTracks(search, page + 1, true);
          setPage(page + 1);
        }}
        ListHeaderComponent={<DisclaimerCard />}
        renderItem={track => {
          const {index, item} = track;
          const {_id, coverArt, artist, title, link} = item;

          return (
            <TrackCard
              songs={songs}
              _id={_id}
              artist={artist}
              title={title}
              coverArt={coverArt}
              link={link}
              index={index}
              local={false}
            />
          );
        }}
        ListEmptyComponent={<EmptyCard />}
      />
    </View>
  );
};

export default Search;
