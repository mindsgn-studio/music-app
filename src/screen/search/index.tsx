import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  TextInput,
  View,
  Text,
  ScrollView,
  FlatList,
} from 'react-native';
import styles from './style';
import {usePlayer} from '../../context';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Search = () => {
  const [search, setSearch] = useState<string>('');
  const {songs, searchTracks, addTrack} = usePlayer();

  useEffect(() => {
    if (search === '') {
      searchTracks();
    }
  }, [search]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Icon name={'search'} size={25} color="#858585" />
        <TextInput
          multiline={false}
          placeholder="Search"
          onSubmitEditing={() => searchTracks(search)}
          style={{
            flex: 1,
            margin: 10,
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
      <FlatList
        data={songs}
        onEndReachedThreshold={20}
        keyExtractor={item => item._id}
        ListHeaderComponent={
          <View
            style={{
              backgroundColor: '#FF522D',
              margin: 10,
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: 'white',
                padding: 10,
              }}>
              Disclaimer: All music on this site are for app use only. We do not
              sell music. We do not claim any special rights to any music. If
              you have a copyrighted music on our site that you wish to take
              down, please send us an email on mixo@mindsgn.studio.
            </Text>
          </View>
        }
        renderItem={track => {
          const {index, item} = track;
          const {_id, coverArt, artist, title, link, albumTitle} = item;

          return (
            <TouchableOpacity
              key={`${_id}-${index}`}
              style={styles.trackCard}
              onPress={() => {
                addTrack([
                  {
                    url: link,
                    title,
                    artist,
                    album: albumTitle,
                    artwork: coverArt,
                  },
                ]);
              }}>
              <ImageBackground
                style={styles.trackImage}
                source={{
                  uri: coverArt,
                }}
              />
              <View>
                <Text numberOfLines={1} style={styles.trackTitle}>
                  {`${title}`}
                </Text>
                <Text numberOfLines={1} style={styles.trackArtist}>
                  {`${artist}`}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <TouchableOpacity
            onPress={() => {
              searchTracks();
            }}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 10,
              padding: 10,
              margin: 10,
              height: 400,
            }}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'SF-Pro-Rounded-Heavy',
                fontSize: 28,
              }}>
              {'Not Found'}
            </Text>
            <Text
              style={{
                color: 'white',
                fontFamily: 'SF-Pro-Rounded-Heavy',
                fontSize: 18,
              }}>
              {
                'Your search did not match any Album, Artist or Song. Please try again.'
              }
            </Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

export default Search;
