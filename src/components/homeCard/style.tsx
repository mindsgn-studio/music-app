import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: 250,
    justifyContent: 'flex-end',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 10,
    height: 100,
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'black',
    justifyContent: 'space-between',
    padding: 10,
  },
  text: {
    color: 'white',
  },
  textArtist: {
    fontFamily: 'SF-Pro-Rounded-Heavy',
    color: '#3A3C3C',
  },
  textTitle: {
    fontFamily: 'SF-Pro-Rounded-Heavy',
    fontSize: 21,
    color: '#E0E0E0',
  },
  source: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    blurRadius: 80,
    height: 40,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: 50,
    height: 50,
    backgroundColor: 'white',
  },
});

export default styles;
