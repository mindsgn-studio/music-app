import React, {useState} from 'react';
import {TextInput, View, FlatList} from 'react-native';
import styles from './style';
import {usePlayer} from '../../context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {DisclaimerCard, TrackCard, EmptyCard} from '../../components';
import {BannerAd, TestIds, BannerAdSize} from 'react-native-google-mobile-ads';
import {FlashList} from '@shopify/flash-list';
const Search = () => {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const {songs, searchTracks} = usePlayer();

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.input}>
          <Icon name={'search'} size={25} color="#858585" />
          <TextInput
            multiline={false}
            placeholder="Search"
            onSubmitEditing={() => searchTracks(search, page, false)}
            style={{
              flex: 1,
              color: 'white',
              fontFamily: 'SF-Pro-Rounded-Heavy',
              fontSize: 18,
            }}
            onChangeText={text => {
              setSearch(text);
            }}
            caretHidden={true}
          />
        </View>
      </View>

      <FlashList
        data={songs}
        keyExtractor={item => item._id}
        ListFooterComponent={
          <View style={{height: 100}}>
            <BannerAd
              unitId={TestIds.BANNER}
              size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            />
          </View>
        }
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
