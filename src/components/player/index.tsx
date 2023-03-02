import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import PlayerAction from '../../redux/actions';

const Player: React.FC = (props: any) => {
  const {play, pause} = PlayerAction(props);
  const {title, artist, isPlaying} = props;

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.detailsContainer}>
          <View>
            <TouchableOpacity>
              <Text style={styles.track}>{title.substring(0, 20)}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.artist}>{artist.substring(0, 20)}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          {isPlaying ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                pause();
              }}>
              <Icon name="pause" size={30} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                play('', '');
              }}>
              <Icon name="play" size={30} color="white" />
            </TouchableOpacity>
          )}
          <TouchableOpacity>
            <Icon
              style={styles.button}
              name="fast-forward"
              size={30}
              color="white"
            />
          </TouchableOpacity>
        </View>
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

export default connect(mapStateToProps)(Player);
