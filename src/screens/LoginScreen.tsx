import React, { useContext, useState } from 'react';
import { StyleSheet, Button } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps, UserData } from './../types/types';
import Facebook from '../services/Facebook';
import LoginProfilePicture from '../components/atoms/LoginProfilePicture';
import { LoginContext } from '../contexts/loginContext/loginContext';

export default function Login({ navigation }: RootTabScreenProps<'TabOne'>) {
    const [profilePictureUrl, setProfilePictureUrl] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Question_Mark.svg/192px-Question_Mark.png');
    const { state, dispatch } = useContext(LoginContext);

    async function login() {
        let facebook = new Facebook();

        await facebook.login();

        const userData: UserData = facebook.getUserData();

        setProfilePictureUrl(userData.pictureUrl);
    }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Tab One</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <View>
            <LoginProfilePicture url={profilePictureUrl}/>
                <Button
                    onPress={login}
                    title="Facebook"
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
