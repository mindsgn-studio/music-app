import React from 'react';
import styles from './style';
import {View, TextInput} from 'react-native';
import {usePlayer} from '../../context';
import Icon from 'react-native-vector-icons/FontAwesome5';

const SearchInput = () => {
  const {searchTracks, setSearch, search, page} = usePlayer();
  return (
    <View style={styles.inputContainer}>
      <View style={styles.input}>
        <Icon name={'search'} size={25} color="#858585" />
        <TextInput
          multiline={false}
          placeholder="Search"
          onSubmitEditing={() => searchTracks(search, page, false)}
          style={styles.textInput}
          onChangeText={text => {
            setSearch(text);
          }}
          caretHidden={true}
        />
      </View>
    </View>
  );
};

export default SearchInput;
