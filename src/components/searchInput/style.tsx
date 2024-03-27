import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
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
  textInput: {
    flex: 1,
    color: 'white',
    fontFamily: 'SF-Pro-Rounded-Heavy',
    fontSize: 18,
  },
});

export default styles;
