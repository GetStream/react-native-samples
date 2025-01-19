import React, {createContext, useContext} from 'react';
import {Channel as ChannelType} from 'stream-chat';
import {ThreadContextValue} from 'stream-chat-react-native';
import {StreamChatGenerics, UserWithToken} from './types';

interface AppContextValue {
  userWithToken?: UserWithToken;
  setUserWithToken: React.Dispatch<
    React.SetStateAction<UserWithToken | undefined>
  >;
  channel?: ChannelType<StreamChatGenerics> | undefined;
  setChannel: React.Dispatch<
    React.SetStateAction<ChannelType<StreamChatGenerics> | undefined>
  >;
  thread?: ThreadContextValue<StreamChatGenerics>['thread'] | undefined;
  setThread: React.Dispatch<
    React.SetStateAction<
      ThreadContextValue<StreamChatGenerics>['thread'] | undefined
    >
  >;
}

const AppContext = createContext<AppContextValue>({
  userWithToken: undefined,
  setUserWithToken: () => {},
  channel: undefined,
  setChannel: () => {},
  thread: undefined,
  setThread: () => {},
});

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = (props: React.PropsWithChildren<{}>) => {
  const [channel, setChannel] = React.useState<AppContextValue['channel']>();
  const [thread, setThread] = React.useState<AppContextValue['thread']>();
  const [userWithToken, setUserWithToken] =
    React.useState<AppContextValue['userWithToken']>();

  const contextValue: AppContextValue = {
    userWithToken,
    setUserWithToken,
    channel,
    setChannel,
    thread,
    setThread,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};
