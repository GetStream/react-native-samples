import React from 'react';

import {Channel as ChannelType} from 'stream-chat';
import {StreamChatGenerics} from '../client';

type AppContextType = {
  channel: ChannelType<StreamChatGenerics> | undefined;
  setChannel: (channel: ChannelType<StreamChatGenerics>) => void;
};

export const AppContext = React.createContext({} as AppContextType);
