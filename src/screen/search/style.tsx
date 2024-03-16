import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  inputContainer: {
    position: 'absolute',
    width: '100%',
    zIndex: 10,
  },
  input: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255 , 255, 255, 0.3)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  trackContainer: {
    flex: 1,
  },
});

export default styles;
