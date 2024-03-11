import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    bottom: 0,
  },
  playerContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    height: 60,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  slider: {
    height: 5,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  blurContainer: {
    position: 'relative',
    flex: 1,
    padding: 0,
    display: 'flex',
    flexDirection: 'row',
  },
  detailsContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  imageContainer: {
    width: 50,
    height: 50,
    backgroundColor: 'black',
  },
  textContainer: {
    paddingLeft: 10,
  },
  artistText: {
    fontFamily: 'SF-Pro-Rounded-Bold',
    color: 'gray',
    fontSize: 10,
  },
  titleText: {
    fontSize: 21,
    color: '#E0E0E0',
    fontWeight: 'bold',
    fontFamily: 'SF-Pro-Rounded-Heavy',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});

export default styles;
