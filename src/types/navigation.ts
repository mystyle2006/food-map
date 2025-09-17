import { NavigatorScreenParams } from '@react-navigation/native';

export type MapStackParamList = {
  MapHome: undefined;
  AddLocation: undefined;
  SearchLocation: undefined;
};

export type AuthStackParamList = {
  AuthHome: undefined;
  Login: undefined;
  Signup: undefined;
};

export type FeedStackParamList = {
  FeedList: undefined;
  FeedDetail: { id: number };
  FeedFavorite: undefined;
  EditLocation: { id: number };
};

export type MainDrawerParamList = {
  Map: NavigatorScreenParams<MapStackParamList>;
  Feed: NavigatorScreenParams<FeedStackParamList>;
  Calendar: undefined;
};

/* INFO: https://reactnavigation.org/docs/typescript */
declare module '@react-navigation/native' {
  interface RootParamList extends MainDrawerParamList {}
}
