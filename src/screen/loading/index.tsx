import React, {useEffect} from 'react';
import {View} from 'react-native';
import styles from './style';
import {Logo} from '../../components';
import {usePlayer} from '../../context';
// import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';

const Loading: React.FC<any> = (props: any) => {
  const {navigation} = props;
  const {isReady} = usePlayer();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Search');
    }, 1000);
  }, [isReady, navigation]);

  return (
    <View style={styles.container}>
      <Logo loading={true} />
    </View>
  );
};

export default Loading;
