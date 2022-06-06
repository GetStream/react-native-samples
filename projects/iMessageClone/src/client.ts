import {StreamChat} from 'stream-chat';
import {
  STREAM_API_KEY,
  STREAM_USER_TOKEN,
  STREAM_USER_ID,
} from 'react-native-dotenv';

export const userToken = STREAM_USER_TOKEN;
export const user = {id: STREAM_USER_ID};

type LocalAttachmentType = Record<string, unknown>;
type LocalChannelType = Record<string, unknown>;
type LocalCommandType = string;
type LocalEventType = Record<string, unknown>;
type LocalMessageType = Record<string, unknown>;
type LocalReactionType = Record<string, unknown>;
type LocalUserType = Record<string, unknown>;

export type StreamChatGenerics = {
  attachmentType: LocalAttachmentType;
  channelType: LocalChannelType;
  commandType: LocalCommandType;
  eventType: LocalEventType;
  messageType: LocalMessageType;
  reactionType: LocalReactionType;
  userType: LocalUserType;
};

export const chatClient =
  StreamChat.getInstance<StreamChatGenerics>(STREAM_API_KEY);
