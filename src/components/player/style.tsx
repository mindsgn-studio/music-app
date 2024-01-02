import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: 80,
    bottom: 60,
    zIndex: 1,
    backgroundColor: '#000000',
    padding: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
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
  artistText: {color: 'white'},
  titleText: {
    fontSize: 21,
    color: '#E0E0E0',
    fontWeight: 'bold',
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
