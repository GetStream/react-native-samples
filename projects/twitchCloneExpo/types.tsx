import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type {ThreadContextValue} from 'stream-chat-expo';
import type {Channel as ChannelType, StreamChat} from 'stream-chat';


export type LocalAttachmentType = Record<string, unknown>;
export type LocalChannelType = Record<string, unknown>;
export type LocalCommandType = string;
export type LocalEventType = Record<string, unknown>;
export type LocalMessageType = Record<string, unknown>;
export type LocalReactionType = Record<string, unknown>;
export interface LocalUserType extends Record<string, unknown> {
  id: string;
}

export type RootStackParamList = {
  Home: undefined; // undefined because you aren't passing any params to the home screen
  Live: { url: string, ID: string };
  Search: undefined;
};

export type LiveScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Live"
>;

export type MainScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Home"
>;

export type SearchScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Search"
>;


export type Channel = ChannelType<
  LocalAttachmentType,
  LocalChannelType,
  LocalCommandType,
  LocalEventType,
  LocalMessageType,
  LocalReactionType,
  LocalUserType
>;

export type Thread = ThreadContextValue<
  LocalAttachmentType,
  LocalChannelType,
  LocalCommandType,
  LocalEventType,
  LocalMessageType,
  LocalReactionType,
  LocalUserType
>['thread'];

export type Client = StreamChat<
  LocalAttachmentType,
  LocalChannelType,
  LocalCommandType,
  LocalEventType,
  LocalMessageType,
  LocalReactionType,
  LocalUserType
>;
