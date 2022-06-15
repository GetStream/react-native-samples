import React, {useCallback, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {Chat, OverlayProvider, ThemeProvider} from 'stream-chat-react-native';

import {Screens} from './src/screens';
import {AppContext} from './src/contexts/AppContext';
import {StreamChatGenerics} from './src/client';
import {SearchContextProvider} from './src/contexts/SearchContext';
import {NewMessageProvider} from './src/contexts/NewMessageContext';
import {Channel as ChannelType} from 'stream-chat';
import {useStreamChatTheme} from './useStreamChatTheme';
import {chatClient, user, userToken} from './src/client';

type State = {
  channel?: ChannelType;
  messageId?: string;
};

const App = () => {
  const {bottom} = useSafeAreaInsets();
  const theme = useStreamChatTheme();

  const [clientReady, setClientReady] = useState(false);
  const [state, setState] = useState<State>({});

  const {channel, messageId} = state;

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
      console.log(channel, innerMessageId, 'nebebeh');
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
        value={{channel, setChannel, chatClient, setChannelWithId, messageId}}>
        <SearchContextProvider>
          <OverlayProvider bottomInset={bottom} value={{style: theme}}>
            <ThemeProvider style={theme}>
              {clientReady && (
                <NewMessageProvider>
                  <Chat client={chatClient}>
                    <Screens />
                  </Chat>
                </NewMessageProvider>
              )}
            </ThemeProvider>
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
