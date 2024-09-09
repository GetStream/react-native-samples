import {User} from 'stream-chat';
import {DefaultStreamChatGenerics} from 'stream-chat-react-native';

type LocalAttachmentType = DefaultStreamChatGenerics['attachmentType'] & {
  latitude?: number;
  longitude?: number;
  ended_at?: string;
};

export type StreamChatGenerics = DefaultStreamChatGenerics & {
  attachmentType: LocalAttachmentType;
};

export type UserWithToken = User<StreamChatGenerics> & {token: string};

export type NavigationParamsList = {
  Channel: undefined;
  ChannelList: undefined;
  Thread: undefined;
  MapDetail: {
    messageId: string;
    latitude: number;
    longitude: number;
    ended_at?: string;
  };
};
