import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '90%',
    height: 300,
    marginTop: 10,
  },
  scrollContainer: {
    width: '100%',
    height: 250,
    display: 'flex',
    flexDirection: 'row',
  },
  card: {
    width: 250,
    height: 250,
    display: 'flex',
    alignItems: 'center',
    margin: 5,
  },
  cardImage: {
    width: 250,
    height: 250,
    borderRadius: 15,
    resizeMode: 'cover',
  },
  cardDetails: {
    position: 'absolute',
    bottom: '0%',
    width: '100%',
    padding: 5,
    backgroundColor: 'rgba(0,0,0, 0.4)',
  },
  cardTitle: {
    color: 'white',
    fontWeight: 'bold',
  },
  cardHandle: {
    color: 'white',
  },
});

export default styles;
