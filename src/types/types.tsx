/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  Login: undefined;
  Search: undefined;
  SignUp: undefined;
  Auth: NavigatorScreenParams<LoginList>;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type LoginList = {
  Login: undefined;
  SignUp: undefined;
}

export type RootTabParamList = {
  Home: {initialSetup: boolean};
  TabOne: undefined;
  MyAccount: {initialSetup: boolean};
  Search: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export type UserConfigLocation = {
  city: string | null
};

export type UserData = {
  id: string,
  token: string,
  isLogged: boolean,
  userName: string,
  pictureUrl: string,
}

export type CountryType = {
  country_name: string | undefined,
  country_short_name: string | undefined,
  country_phone_code: string | undefined
}
export type StateType = {
  state_name: string | undefined,
}

export type CityType = {
  city_name: string | undefined,
}

export type LocationRequestType = {
  config: any,
  data: Array<CountryType | CityType | StateType>,
  headers: any,
  request: any,
  status: number,
  statusText: unknown
}