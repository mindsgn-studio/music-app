import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    width: '100%',
    marginVertical: 10,
    padding: 10,
    paddingBottom: 100,
  },
  detailsContainer: {
    marginHorizontal: 10,
  },
  text: {
    fontFamily: 'SF-Pro-Rounded-Heavy',
    color: 'white',
    fontSize: 32,
  },
  artistText: {
    fontFamily: 'SF-Pro-Rounded-Bold',
    color: 'gray',
    fontSize: 12,
  },
  albumText: {
    fontFamily: 'SF-Pro-Rounded-Heavy',
    color: 'white',
    fontSize: 16,
  },
  cardRow: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  card: {
    display: 'flex',
    fex: 1,
    flexDirection: 'row',
    width: '100%',
    height: 30,
    marginVertical: 10,
    borderRadius: 50,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default styles;
