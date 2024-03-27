import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  trackCard: {
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: "color: 'rgba(255, 255, 255, 0.1),",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  trackImage: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  trackTitle: {
    width: 200,
    color: 'white',
    fontFamily: 'SF-Pro-Rounded-Heavy',
  },
  trackArtist: {
    width: 200,
    fontFamily: 'SF-Pro-Rounded-Heavy',
    color: 'rgba(255, 255, 255, 0.2)',
  },
});

export default styles;
