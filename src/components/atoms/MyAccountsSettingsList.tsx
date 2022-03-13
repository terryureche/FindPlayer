import * as React from 'react';
import {FlatList} from "react-native";
import tw from "../../utils/tailwind";
import {Avatar, ListItem} from "react-native-elements";
import {useContext} from "react";
import {LoginContext} from "../../contexts/loginContext/loginContext";
import useAsyncStorage from "../../hooks/useAsyncStorage";
import {LoginTypes} from "../../contexts/loginContext/type";

interface ItemList {
  name: string,
  avatar_icon: string,
  clickFunction: () => void,
}

export default function MyAccountsSettingsList({navigation} : { navigation: any}) {
  const NOT_LOGIN = {
    id: '',
    isLogged: false,
    token: '',
    userName: '',
    profilePictureUrl: ''
  };

  const [loginInfo, updateLoginInfo] = useAsyncStorage('login', NOT_LOGIN);

  const { state, dispatch } = useContext(LoginContext);

  const list = [
    {
      name: 'Notifications',
      avatar_icon: 'notifications',
      clickFunction: () =>  { console.log('notifications') },
    },
    {
      name: 'User Settings',
      avatar_icon: 'people',
      clickFunction: () =>  { console.log('settings') },
    },
    {
      name: 'Friends',
      avatar_icon: 'groups',
      clickFunction: () =>  { console.log('friends') },
    },
    {
      name: 'Logout',
      avatar_icon: 'logout',
      clickFunction: () =>  {
        updateLoginInfo(NOT_LOGIN);
        dispatch({
          type: LoginTypes.UpdateLogout
        });

        navigation.navigate(
          'Auth',
          {
            screen: 'Login'
          }
        );
      },
    },
  ];

  const keyExtractor = (item: ItemList, index: number) => index.toString();

  const renderItem = ({ item }: {item:  ItemList }) => (
    <ListItem bottomDivider containerStyle={tw`bg-gray-900`} onPress={item.clickFunction}>
      <Avatar rounded icon={{ name: item.avatar_icon }} />
      <ListItem.Content>
        <ListItem.Title style={tw`text-xl text-white`}>{item.name}</ListItem.Title>
        {/*<ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>*/}
      </ListItem.Content>
      <ListItem.Chevron/>
    </ListItem>
  );

  return (
    <FlatList data={list} renderItem={renderItem} keyExtractor={keyExtractor}/>
  )
}