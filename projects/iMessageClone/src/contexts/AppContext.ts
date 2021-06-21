import React from 'react';

import {StreamChat, Channel as ChannelType} from 'stream-chat';

type AppContextType = {
  chatClient: StreamChat;
  channel: ChannelType | undefined;
  setChannel: (channel: ChannelType) => void;
  setChannelWithId: (channelId: string, messageId?: string) => Promise<void>;
  messageId?: string;
};

export const AppContext = React.createContext({} as AppContextType);
