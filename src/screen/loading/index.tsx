import React, {useEffect, memo} from 'react';
import {View} from 'react-native';
import styles from './style';
import {Logo} from '../../components';
import {usePlayer} from '../../context';

const Loading: React.FC<any> = (props: any) => {
  const {navigation} = props;
  const {isReady} = usePlayer();

  useEffect(() => {
    if (isReady) {
      navigation.replace('Home');
    }
  }, [isReady, navigation]);

  return (
    <View style={styles.container}>
      <Logo loading={true} />
    </View>
  );
};

export default memo(Loading);
