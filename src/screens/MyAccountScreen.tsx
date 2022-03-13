import * as React from 'react';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types/types';
import tailwind from "../utils/tailwind";
import {useContext} from "react";
import {LoginContext} from "../contexts/loginContext/loginContext";
import LoginProfilePicture from "../components/atoms/LoginProfilePicture";
import MyAccountsSettingsList from "../components/atoms/MyAccountsSettingsList";

export default function MyAccountScreen({ route, navigation }: RootTabScreenProps<'MyAccount'>) {
  const { state, dispatch } = useContext(LoginContext);

  const helloUser = state.user.userName ? `Hello, ${state.user.userName} !`: "Hello!"

  return (
    <View style={tailwind`flex flex-col`}>
      <View style={tailwind`flex-row h-1/5 relative`}>
          <LoginProfilePicture
            url={state.user.profilePictureUrl || ""}
            source={require('./../assets/images/profile-pic-dummy.png')}
            imageStyle={tailwind`w-20 h-20 mr-4 bg-transparent ml-5`}/>
          <View style={tailwind`flex items-center justify-center`}>
            <Text style={tailwind`text-3xl`}>
              {helloUser}
            </Text>
          </View>
      </View>
      <View style={tailwind`bg-yellow-500 h-4/5`}>
        <MyAccountsSettingsList  navigation={navigation}/>
      </View>
    </View>
  );
}

