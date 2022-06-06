import React, {useEffect, useState} from 'react';
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

const App = () => {
  const {bottom} = useSafeAreaInsets();
  const theme = useStreamChatTheme();

  const [channel, setChannel] = useState<ChannelType<StreamChatGenerics>>();
  const [clientReady, setClientReady] = useState(false);

  useEffect(() => {
    const setupClient = async () => {
      await chatClient.connectUser(user, userToken);
      setClientReady(true);
    };

    setupClient();
  }, []);

  return (
    <NavigationContainer>
      <AppContext.Provider value={{channel, setChannel}}>
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
