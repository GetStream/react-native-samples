import {StreamChat} from 'stream-chat';
import {STREAM_API_KEY, STREAM_USER_TOKEN} from '@env';

export const userToken = STREAM_USER_TOKEN;
export const user = {id: 'vishal'};

export const chatClient = StreamChat.getInstance(STREAM_API_KEY);
