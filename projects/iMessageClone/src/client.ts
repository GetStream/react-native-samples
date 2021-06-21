import {StreamChat} from 'stream-chat';
import {
  STREAM_API_KEY,
  STREAM_USER_TOKEN,
  STREAM_USER_ID,
} from 'react-native-dotenv';

export const userToken = STREAM_USER_TOKEN;
export const user = {id: STREAM_USER_ID};

export const chatClient = StreamChat.getInstance(STREAM_API_KEY);
