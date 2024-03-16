import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    height: 400,
  },
  title: {
    color: 'white',
    fontFamily: 'SF-Pro-Rounded-Heavy',
    fontSize: 28,
  },
  text: {color: 'white', fontFamily: 'SF-Pro-Rounded-Heavy', fontSize: 18},
});

export default styles;
