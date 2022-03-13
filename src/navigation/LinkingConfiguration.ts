/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types/types';
import MyAccountScreen from "../screens/MyAccountScreen";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Auth: {
        screens: {
          Login: 'login',
          SignUp: 'signup'
        },
      },
      Root: {
        screens: {
          Home: {
            screens: {
              TabOneScreen: 'one',
            },
          },
          Search: {
            screens: {
              TabSearch: 'search',
            },
          },
          MyAccount: {
            screens: {
              MyAccountScreen: 'two',
            },
          },
        },
      },
      Modal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;
