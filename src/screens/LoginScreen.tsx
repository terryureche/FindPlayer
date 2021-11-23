import React, { useContext, useState, useEffect } from 'react';
import {Alert, StyleSheet} from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps, UserData } from '../types/types';
import Facebook from '../services/Facebook';
import { LoginContext } from '../contexts/loginContext/loginContext';
import { LoginTypes } from '../contexts/loginContext/type';
import tw from "../utils/tailwind";
import {Input} from "react-native-elements/dist/input/Input";
import {Button, Icon} from "react-native-elements";
import Divider from "../components/atoms/Divider";
import BackgroundWithCard from "../components/templates/BackgroundWithCard";
import { auth } from "../services/Firebase/Firebase";
import firebase from "firebase/compat";
import Spinner from "react-native-loading-spinner-overlay";
import useAsyncStorage from "../hooks/useAsyncStorage";

export default function Login({ navigation }: RootTabScreenProps<'TabOne'>) {
    const [profilePictureUrl, setProfilePictureUrl] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Question_Mark.svg/192px-Question_Mark.png');
    const [error, setError] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [invalidEmail, setInvalidEmail] = useState<boolean>(false);
    const [invalidPassword, setInvalidPassword] = useState<boolean>(false);
    const [spinnerVisibility, setSpinnerVisibility] = useState<boolean>(true);
    const [loginInfo, updateLoginInfo] = useAsyncStorage('login', {
      id: '',
      isLogged: false,
      token: '',
      userName: '',
      profilePictureUrl: '',
      initialSetup: false
    });
    const { state, dispatch } = useContext(LoginContext);
    let facebook = new Facebook();

    useEffect( () => {
      if(loginInfo && loginInfo.isLogged) {
        dispatch({
          type: LoginTypes.UpdateLogin,
          payload: {
            id: loginInfo.id,
            isLogged: loginInfo.isLogged,
            token: loginInfo.token,
            userName: loginInfo.userName,
            profilePictureUrl: loginInfo.profilePictureUrl,
            initialSetup: loginInfo.initialSetup
          }
        });

        navigation.navigate(
          'Root',
          {
            screen: 'Home',
            params: {
              initialSetup: true
            }
          }
        );

        setSpinnerVisibility(false);
      } else {

        const getUserDataFromFirebase = async () => {
          const firebaseUserData = await firebase.database().ref('users/' + auth.currentUser?.uid).get();

          const { data, playerQualities } = firebaseUserData;
        }

        getUserDataFromFirebase
      }

    }, [loginInfo])

    async function login() {
      setSpinnerVisibility(true);

      if (email.length < 5) {
        setInvalidEmail(true);
        setSpinnerVisibility(false);
      }

      if(password.length < 5) {
        setInvalidPassword(true);
        setSpinnerVisibility(false);

        return;
      }

      try {
        const data: any = await auth.signInWithEmailAndPassword(email, password);
        const {displayName, uid}: {displayName: string, uid: string} = data.user;

        updateLoginData({
          id: uid,
          isLogged: true,
          token: '',
          userName: '',
          profilePictureUrl: '',
          initialSetup: false
        });

        setSpinnerVisibility(false);
      } catch (e) {
        Alert.alert(
          'Error',
          e.message,
          [{
            'text' :'Ok',
            onPress: () => {
              setSpinnerVisibility(false);
            }
          }]
        );
      }
    }

    function updateLoginData(user: any) {
      updateLoginInfo({
        id: user.id,
        isLogged: user.isLogged,
        token: '',
        userName: user.userName,
        profilePictureUrl: '',
        initialSetup: false
      });

      dispatch({
        type: LoginTypes.UpdateLogin,
        payload: {
          id: user.id,
          isLogged: user.isLogged,
          token: '',
          userName: user.userName,
          profilePictureUrl: '',
        }
      });
    }

    async function facebookLogin() {

        // await facebook.login();
        //
        // const userData: UserData = facebook.getUserData();
        //
        // await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        // const credential = firebase.auth.FacebookAuthProvider.credential(userData.token);
        // const facebookProfileData = await auth.signInWithCredential(credential);
        //
        // setProfilePictureUrl(userData.pictureUrl);
        //
        // updateLoginData({
        //   id: userData.id,
        //   isLogged: true,
        //   token: userData.token,
        //   userName: userData.userName,
        //   profilePictureUrl: userData.pictureUrl,
        // });
        //
        // dispatch({
        //   type: LoginTypes.UpdateLogin,
        //   payload: {
        //     id: userData.id,
        //     isLogged: true,
        //     token: userData.token,
        //     userName: userData.userName,
        //     profilePictureUrl: userData.pictureUrl,
        //   }
        // });
        //
        // navigation.navigate(
        //   'Root',
        //   {
        //     screen: 'Home',
        //     params: {
        //       initialSetup: state.user.initialSetup
        //     }
        //   }
        // );
    }

    async function guess() {
      dispatch({
        type: LoginTypes.UpdateLogin,
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

    function goToSingUp() {
      navigation.navigate(
        'Auth',
        {
          screen: "SignUp"
        }
      );
    }

    return (
      <BackgroundWithCard backgroundImagePath={require('./../assets/images/soccer.png')}>
        <View style={tw`bg-transparent`}>
          <Spinner
            visible={spinnerVisibility}
            textContent={'Loading...'}
          />
          <Text style={tw`text-black font-black text-2xl p-4`}>Log-in</Text>
          {/*<LoginProfilePicture url={profilePictureUrl}/>*/}
          <View style={tw`bg-transparent p-4`}>
            <Input
              placeholderTextColor={'gray'}
              inputContainerStyle={tw`border-gray-400`}
              leftIcon={{type:'font-awesome', name:'user', color: 'gray'}}
              leftIconContainerStyle={tw``}
              label='Username'
              placeholder='your@email.com'
              autoCapitalize='none'
              autoCompleteType='off'
              autoCorrect={false}
              value={email}
              errorMessage={invalidEmail ? 'Enter a valid email' : ''}
              errorStyle={tw`text-red-500`}
              onTextInput={() => {setInvalidEmail(false)}}
              onChangeText={setEmail}
            />
            <Input
              placeholderTextColor={'gray'}
              leftIcon={{type:'font-awesome', name:'lock', color: 'gray'}}
              inputContainerStyle={tw`border-gray-400`}
              label='Password'
              placeholder='password'
              secureTextEntry={true}
              autoCapitalize='none'
              autoCompleteType='off'
              autoCorrect={false}
              value={password}
              errorMessage={invalidPassword ? 'Invalid password.' : ''}
              errorStyle={tw`text-red-500`}
              onTextInput={() => {setInvalidPassword(false)}}
              onChangeText={setPassword}
            />
            <Button
              title='Login'
              onPress={login}
              buttonStyle={tw`dark-green rounded-3xl`}
            />
            <View style={tw`bg-transparent flex flex-row justify-center`}>
              <Text style={tw`text-black pt-3`}>Don't have an account?</Text>
              <Button
                titleStyle={tw`text-sm font-bold text-green-900`}
                type='clear'
                title='Sign-up'
                onPress={() => {goToSingUp()}}
              />
            </View>
          </View>
          <Divider text='Or login with'/>
          <View style={tw`bg-transparent`}>
            <View style={tw`bg-transparent flex flex-row justify-center pt-6`}>
              <Button
                titleStyle={tw`text-sm font-bold text-green-900`}
                type='clear'
                icon={<Icon color='blue' name='facebook' size={50}/>}
                onPress={() => facebookLogin()}
              />
            </View>
          </View>
        </View>
      </BackgroundWithCard>
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
