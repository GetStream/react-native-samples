import {
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined; // undefined because you aren't passing any params to the home screen
  Live: { url: string };
};

export type LiveScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Live"
>;

export type MainScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Home"
>;


