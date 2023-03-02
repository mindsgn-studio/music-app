import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    display: 'flex',
    zIndex: 1,
    width: '100%',
    height: 60,
    bottom: '2%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    width: '95%',
    borderRadius: 10,
    backgroundColor: 'rgba(0,0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    marginLeft: 5,
    marginRight: 5,
  },
  track: {
    fontSize: 21,
    color: 'white',
  },
  artist: {
    fontSize: 10,
    color: 'white',
  },
});

export default styles;
