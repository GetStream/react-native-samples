import React from 'react';

import {Channel as ChannelType, StreamChat} from 'stream-chat';
import {StreamChatGenerics} from '../client';

type AppContextType = {
  chatClient: StreamChat<StreamChatGenerics>;
  channel: ChannelType<StreamChatGenerics> | undefined;
  setChannel: (channel: ChannelType<StreamChatGenerics>) => void;
  setChannelWithId: (channelId: string, messageId?: string) => Promise<void>;
  messageId?: string;
};

export const AppContext = React.createContext({} as AppContextType);
