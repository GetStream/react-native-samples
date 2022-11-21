import React, {useCallback, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {Chat, OverlayProvider, ThemeProvider} from 'stream-chat-react-native';

import {Screens} from './src/screens';
import {AppContext} from './src/contexts';
import {chatClient, user, userToken} from './src/client';
import {SearchContextProvider} from './src/contexts';
import {NewMessageProvider} from './src/contexts';
import {Channel as ChannelType} from 'stream-chat';
import {useStreamChatTheme} from './useStreamChatTheme';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Alert} from 'react-native';

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
      if (!user.id || !userToken) {
        Alert.alert(
          'Please set API_KEY, USER_ID and USER_TOKEN in .env file as mentioned in README file and restart the project',
        );
        return;
      }
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
          <GestureHandlerRootView style={{flex: 1}}>
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
          </GestureHandlerRootView>
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
