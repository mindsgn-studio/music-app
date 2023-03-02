import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import {connect} from 'react-redux';

const RadioCard: React.FC = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.detailsContainer}>
        <View>
          <Text style={styles.title}>Welcome to Naledi</Text>
        </View>
        <View>
          <Text style={styles.text}>
            Join us on Naledi, Africa's first community owned streaming
            platform. To become a owner all you have to do is stream...
          </Text>
        </View>
      </View>
      <View />
    </TouchableOpacity>
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
