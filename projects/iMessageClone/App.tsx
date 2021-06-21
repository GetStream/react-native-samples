import React, {useEffect, useState, useCallback} from 'react';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {Channel as ChannelType} from 'stream-chat';
import {Chat, OverlayProvider} from 'stream-chat-react-native';

import {Screens} from './src/screens';
import {AppContext} from './src/contexts/AppContext';
import {theme} from './src/theme';
import {chatClient, userToken, user} from './src/client';
import {SearchContextProvider} from './src/contexts/SearchContext';
import {NewMessageProvider} from './src/contexts/NewMessageContext';

LogBox.ignoreAllLogs(true);

type State = {
  channel?: ChannelType;
  messageId?: string;
};

const App = () => {
  const {bottom} = useSafeAreaInsets();

  const [state, setState] = useState<State>({});
  const {channel, messageId} = state;
  const [clientReady, setClientReady] = useState(false);

  useEffect(() => {
    const setupClient = async () => {
      await chatClient.connectUser(user, userToken);

      setClientReady(true);
    };

    setupClient();
  }, []);

  const setChannelWithId = useCallback(
    async (channelId: string, innerMessageId?: string) => {
      const newChannel = chatClient?.channel('messaging', channelId);

      if (!newChannel?.initialized) {
        await newChannel?.watch();
      }
      setState({channel: newChannel, messageId: innerMessageId});
    },
    [],
  );

  const setChannel = useCallback(
    (newChannel: ChannelType) => setState({channel: newChannel}),
    [],
  );

  return (
    <NavigationContainer>
      <AppContext.Provider
        value={{chatClient, channel, setChannel, setChannelWithId, messageId}}>
        <SearchContextProvider>
          <OverlayProvider bottomInset={bottom} value={{style: theme}}>
            <Chat style={theme} client={chatClient}>
              {clientReady && (
                <>
                  <NewMessageProvider>
                    <Screens />
                  </NewMessageProvider>
                </>
              )}
            </Chat>
          </OverlayProvider>
        </SearchContextProvider>
      </AppContext.Provider>
    </NavigationContainer>
  );
};

export default () => {
  return (
    <SafeAreaProvider>
      <App />
    </SafeAreaProvider>
  );
};
