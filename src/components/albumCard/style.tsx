import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    backgroundColor: 'black',
    marginVertical: 10,
    padding: 10,
  },
  text: {
    fontFamily: 'SF-Pro-Rounded-Heavy',
    color: 'white',
    fontSize: 32,
  },
  cardRow: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  card: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
});

export default styles;
