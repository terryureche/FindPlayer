import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
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


export default function Login({ navigation }: RootTabScreenProps<'TabOne'>) {
    const [profilePictureUrl, setProfilePictureUrl] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Question_Mark.svg/192px-Question_Mark.png');
    const { state, dispatch } = useContext(LoginContext);
    let facebook = new Facebook();

    async function login() {

        await facebook.login();

        const userData: UserData = facebook.getUserData();

        setProfilePictureUrl(userData.pictureUrl);

        dispatch({
          type: LoginTypes.UpdateLogin,
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

    return (
      <BackgroundWithCard backgroundImagePath={require('./../assets/images/soccer.png')}>
        <View style={tw`bg-transparent`}>
          <Text style={tw`text-black font-black text-2xl p-4`}>Log-in</Text>
          {/*<LoginProfilePicture url={profilePictureUrl}/>*/}
          <View style={tw`bg-transparent p-4`}>
            <Input
              placeholderTextColor={'gray'}
              inputContainerStyle={tw`border-gray-400`}
              leftIcon={{type:'font-awesome', name:'user', color: 'gray'}}
              leftIconContainerStyle={tw``}
              label='Username'
              placeholder='Your User'
              autoCapitalize='none'
              autoCompleteType='off'
              autoCorrect={false}
            />
            <Input
              placeholderTextColor={'gray'}
              leftIcon={{type:'font-awesome', name:'lock', color: 'gray'}}
              inputContainerStyle={tw`border-gray-400`}
              label='Password'
              placeholder='Your Password'
              secureTextEntry={true}
              autoCapitalize='none'
              autoCompleteType='off'
              autoCorrect={false}
            />
            <Button
              title='Login'
              onPress={() => {}}
              buttonStyle={tw`dark-green rounded-3xl`}
            />
            <View style={tw`bg-transparent flex flex-row justify-center`}>
              <Text style={tw`text-black pt-3`}>Don't have an account?</Text>
              <Button
                titleStyle={tw`text-sm font-bold text-green-900`}
                type='clear'
                title='Sing-up'
                onPress={() => {}}
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
                onPress={() => {}}
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
