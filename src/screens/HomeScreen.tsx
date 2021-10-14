import React, { useState, useContext } from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types/types';
import InitialUserSetup from '../components/organisms/InitialUserSetup';
import { LoginContext } from '../contexts/loginContext/loginContext';

export default function HomeScreen({ route, navigation }: RootTabScreenProps<'Home'>) {
  const { state, dispatch } = useContext(LoginContext);
  const userConfiguration = route.params.initialSetup || true;

  const [ isUserConfigured, setIsUserConfigured  ] = useState(userConfiguration);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
      <InitialUserSetup userContextDispatch={dispatch} setVisible={setIsUserConfigured} isVisible={isUserConfigured} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
