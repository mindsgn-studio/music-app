import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';

const RadioCard: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <View>
          <Text style={styles.title}>Welcome to Naledi</Text>
        </View>
        <View>
          <Text style={styles.text}>
            Join us on BLVCK, Africa's first community owned streaming platform.
            To become a owner all you have to do is stream...
          </Text>
        </View>
      </View>
      <View>
        <TouchableOpacity>
          <Icon name="play" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isPlaying: state.Player.isPlaying,
    artist: state.Player.artist,
    title: state.Player.title,
  };
};

export default connect(mapStateToProps)(RadioCard);