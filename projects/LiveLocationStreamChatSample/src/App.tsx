import React, {useEffect, useState} from 'react';
import {LogBox, StyleSheet, useColorScheme} from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';

import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {Chat, OverlayProvider, Streami18n} from 'stream-chat-react-native';
import {StreamChat} from 'stream-chat';

import {useStreamChatTheme} from '../useStreamChatTheme';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationParamsList, StreamChatGenerics} from './common/types';
import {createStackNavigator} from '@react-navigation/stack';
import ChannelScreen from './screens/ChannelScreen';
import ChannelListScreen from './screens/ChannelListScreen';
import {AppContextProvider, useAppContext} from './common/AppContext';
import ThreadScreen from './screens/ThreadScreen';
import {LiveLocationContextProvider} from './common/LiveLocationContext';
import MapDetailScreen from './screens/MapDetailScreen';
import {UsersListScreen} from './screens/UsersListScreen';

LogBox.ignoreAllLogs(true);

/**
 * Start playing with streami18n instance here:
 * Please refer to description of this PR for details: https://github.com/GetStream/stream-chat-react-native/pull/150
 */
const streami18n = new Streami18n({
  language: 'en',
});
const EmptyComponent = () => <></>;

const Stack = createStackNavigator<NavigationParamsList>();

const Navigator = () => {
  const {userWithToken, channel} = useAppContext();
  const [chatClient, setChatClient] =
    useState<StreamChat<StreamChatGenerics>>();

  useEffect(() => {
    if (userWithToken) {
      const client = StreamChat.getInstance<StreamChatGenerics>('q95x9hkbyd6p');
      const {token, ...user} = userWithToken;
      client.connectUser(user, token).catch(console.error);
      setChatClient(client);

      return () => {
        client.disconnectUser();
      };
    }
  }, [userWithToken]);

  if (!chatClient) {
    return <UsersListScreen />;
  }

  return (
    <Chat client={chatClient} i18nInstance={streami18n}>
      <LiveLocationContextProvider>
        <Stack.Navigator
          screenOptions={{
            headerTitleStyle: {alignSelf: 'center', fontWeight: 'bold'},
          }}>
          <Stack.Screen
            component={ChannelListScreen}
            name="ChannelList"
            options={{headerTitle: 'Channel List'}}
          />
          <Stack.Screen
            component={ChannelScreen}
            name="Channel"
            options={() => ({
              headerBackTitle: 'Back',
              headerRight: EmptyComponent,
              headerTitle: channel?.data?.name,
            })}
          />
          <Stack.Screen
            component={MapDetailScreen}
            name="MapDetail"
            options={{headerTitle: 'Live Location'}}
          />
          <Stack.Screen
            component={ThreadScreen}
            name="Thread"
            options={() => ({headerLeft: EmptyComponent})}
          />
        </Stack.Navigator>
      </LiveLocationContextProvider>
    </Chat>
  );
};

const App = () => {
  const colorScheme = useColorScheme();
  const {bottom} = useSafeAreaInsets();
  const theme = useStreamChatTheme();

  return (
    <NavigationContainer
      theme={{
        colors: colorScheme === 'dark' ? DarkTheme.colors : DefaultTheme.colors,
        dark: colorScheme === 'dark',
      }}>
      <GestureHandlerRootView style={styles.gestureHandlerRootView}>
        <AppContextProvider>
          <OverlayProvider<StreamChatGenerics>
            bottomInset={bottom}
            i18nInstance={streami18n}
            value={{style: theme}}>
            <Navigator />
          </OverlayProvider>
        </AppContextProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  gestureHandlerRootView: {
    flex: 1,
  },
});

export default () => {
  const theme = useStreamChatTheme();

  return (
    <SafeAreaProvider
      style={{backgroundColor: theme.colors?.white_snow || '#FCFCFC'}}>
      <App />
    </SafeAreaProvider>
  );
};
