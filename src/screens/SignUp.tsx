import React, { useState, useContext } from 'react';
import {Text, View} from "../components/Themed";
import BackgroundWithCard from "../components/templates/BackgroundWithCard";
import tw from "../utils/tailwind";
import {Input} from "react-native-elements/dist/input/Input";
import {Button, Icon} from "react-native-elements";
import { Alert } from 'react-native';
import {auth} from "../services/Firebase/Firebase";
import Spinner from 'react-native-loading-spinner-overlay';
import { LoginContext } from '../contexts/loginContext/loginContext';
import { LoginTypes } from '../contexts/loginContext/type';
import {RootTabScreenProps} from "../types/types";

export default function SignUp({ navigation }:  RootTabScreenProps<'Home'>) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [invalidName, setInvalidName] = useState<boolean>(false);
  const [invalidEmail, setInvalidEmail] = useState<boolean>(false);
  const [invalidPassword, setInvalidPassword] = useState<boolean>(false);
  const [invalidConfirmPassword, setInvalidConfirmPassword] = useState<boolean>(false);
  const [notSamePassword, setNotSamePassword] = useState<boolean>(false);
  const [spinnerVisibility, setSpinnerVisibility] = useState<boolean>(false);
  const { state, dispatch } = useContext(LoginContext);

  async function createUser() {
    setSpinnerVisibility(true);
    const regValidEmail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

    if(email.length < 5 || !regValidEmail.test(email)) {
      setInvalidEmail(true);
      setSpinnerVisibility(false);

      return;
    }

    if(displayName.length < 1) {
      setInvalidName(true);
      setSpinnerVisibility(false);

      return;
    }

    if(password.length < 5) {
      setInvalidPassword(true);
      setSpinnerVisibility(false);

      return;
    }

    if(confirmPassword.length < 5) {
      setInvalidConfirmPassword(true);
      setSpinnerVisibility(false);

      return;
    }

    if(confirmPassword !== password) {
      setNotSamePassword(true);
      setSpinnerVisibility(false);

      return;
    }

    try {
      const firebaseData = await auth.createUserWithEmailAndPassword(email, password);

      await firebaseData.user?.updateProfile({
        displayName
      });

      setSpinnerVisibility(false);

      dispatch({
        type: LoginTypes.UpdateLogin,
        payload: {
          id: firebaseData.user?.uid,
          isLogged: true,
          token: '',
          username: email,
          profilePictureUrl: null
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

  return (
    <BackgroundWithCard backgroundImagePath={require('./../assets/images/signup.png')}>
      <View style={tw`bg-transparent`}>
        <Spinner
          visible={spinnerVisibility}
          textContent={'Loading...'}
        />
        <Text style={tw`text-black font-black text-2xl pt-4 pl-4`}>SignUp</Text>
        {/*<LoginProfilePicture url={profilePictureUrl}/>*/}
        <View style={tw`bg-transparent p-4`}>
          <Input
            placeholderTextColor={'gray'}
            inputContainerStyle={tw`border-gray-400`}
            leftIcon={{type:'font-awesome', name:'user', color: 'gray'}}
            label='Email'
            placeholder='email@address.com'
            errorMessage={invalidEmail ? 'Enter a valid email' : ''}
            errorStyle={tw`text-red-500`}
            autoCapitalize='none'
            autoCompleteType='off'
            autoCorrect={false}
            value={email}
            onTextInput={() => {setInvalidEmail(false)}}
            onChangeText={setEmail}
          />
          <Input
            placeholderTextColor={'gray'}
            leftIcon={{type:'font-awesome', name:'lock', color: 'gray'}}
            inputContainerStyle={tw`border-gray-400`}
            label='Name'
            placeholder='Name'
            errorMessage={invalidName ?'Invalid name' : ''}
            errorStyle={tw`text-red-500`}
            autoCapitalize='none'
            autoCompleteType='off'
            autoCorrect={false}
            value={displayName}
            onTextInput={() => {setInvalidName(false);}}
            onChangeText={setDisplayName}
          />
          <Input
            placeholderTextColor={'gray'}
            leftIcon={{type:'font-awesome', name:'lock', color: 'gray'}}
            inputContainerStyle={tw`border-gray-400`}
            label='Password'
            placeholder='password'
            errorMessage={invalidPassword ? 'Invalid password.' : ''}
            errorStyle={tw`text-red-500`}
            secureTextEntry={true}
            autoCapitalize='none'
            autoCompleteType='off'
            autoCorrect={false}
            value={password}
            onTextInput={() => {setInvalidPassword(false)}}
            onChangeText={setPassword}
          />
          <Input
            placeholderTextColor={'gray'}
            leftIcon={{type:'font-awesome', name:'lock', color: 'gray'}}
            inputContainerStyle={tw`border-gray-400`}
            label='Confirm Password'
            placeholder='confirm password'
            errorMessage={
              invalidConfirmPassword ?
                'Invalid confirmation password.' :  notSamePassword ?
                  'Confirm password is not matching the password' : ''
            }
            errorStyle={tw`text-red-500`}
            secureTextEntry={true}
            autoCapitalize='none'
            autoCompleteType='off'
            autoCorrect={false}
            value={confirmPassword}
            onTextInput={() => {setInvalidConfirmPassword(false);  setNotSamePassword(false);}}
            onChangeText={setConfirmPassword}
          />
          <Button
            title='Create'
            onPress={createUser}
            buttonStyle={tw`dark-green rounded-3xl mt-1`}
          />
        </View>
      </View>
    </BackgroundWithCard>
  )
}