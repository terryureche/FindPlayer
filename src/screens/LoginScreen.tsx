import React, { useContext, useState } from 'react';
import { StyleSheet, Button } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps, UserData } from './../types/types';
import Facebook from '../services/Facebook';
import LoginProfilePicture from '../components/atoms/LoginProfilePicture';
import { LoginContext } from '../contexts/loginContext/loginContext';
import tw from 'tailwind-react-native-classnames';
import { LoginTypes } from '../contexts/loginContext/type';

export default function Login({ navigation }: RootTabScreenProps<'TabOne'>) {
    const [profilePictureUrl, setProfilePictureUrl] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Question_Mark.svg/192px-Question_Mark.png');
    const { state, dispatch } = useContext(LoginContext);
    let facebook = new Facebook();

    async function login() {

        await facebook.login();

        const userData: UserData = facebook.getUserData();

        setProfilePictureUrl(userData.pictureUrl);

        dispatch({
          type: LoginTypes.Update,
          payload: {
            id: userData.id,
            isLogged: true,
            token: userData.token,
            userName: userData.userName,
            profilePictureUrl: userData.pictureUrl,
          }
        });

        navigation.navigate(
          'Root',
          {
            screen: 'Home',
            params: {
              initialSetup: state.user.initialSetup
            }
          }
        );
    }

    async function guess() {
      dispatch({
        type: LoginTypes.Update,
        payload: {
          isLogged: false,
          profilePictureUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Question_Mark.svg/192px-Question_Mark.png'
        }
      });

      navigation.navigate(
        'Root',
        {
          screen: 'Home',
          params: {
            initialSetup: state.user.initialSetup
          }
        }
      );
    }

    return (
      <View style={styles.container}>
          <Text style={styles.title}>Login</Text>
          {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
          <View>
              <LoginProfilePicture url={profilePictureUrl}/>
              <Button
                  onPress={login}
                  title="Facebook"
              />
              <Button
                  onPress={guess}
                  title="Continue as Guess"
              />
          </View>
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
