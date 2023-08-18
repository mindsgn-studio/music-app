import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 100,
    flex: 1,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  text: {
    position: 'absolute',
    color: 'white',
    fontSize: 70,
    fontWeight: 'bold',
  },
});

export default styles;
