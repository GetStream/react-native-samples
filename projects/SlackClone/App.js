import { USER_ID, USER_TOKEN } from 'react-native-dotenv';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  LogBox,
  SafeAreaView,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Chat, OverlayProvider } from 'stream-chat-react-native';

import { DarkTheme, LightTheme } from './src/appTheme';
import { BottomTabs } from './src/components/BottomTabs';
import { SlackAppContext } from './src/contexts/SlackAppContext';
import useStreamChatTheme from './src/hooks/useStreamChatTheme';
import { ChannelListScreen } from './src/screens/ChannelListScreen/ChannelListScreen';
import { ChannelScreen } from './src/screens/ChannelScreen/ChannelScreen';
import { ChannelSearchScreen } from './src/screens/ChannelSearchScreen/ChannelSearchScreen';
import { JumpToSearchScreen } from './src/screens/ChannelSearchScreen/JumpToSearchScreen';
import { DirectMessagesScreen } from './src/screens/DirectMessagesScreen';
import { DraftsScreen } from './src/screens/DraftsScreen';
import { MentionsScreen } from './src/screens/MentionsScreen/MentionsScreen';
import { MessageSearchScreen } from './src/screens/MessageSearchScreen/MessageSearchScreen';
import { NewMessageScreen } from './src/screens/NewMessageScreen/NewMessageScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { ShareMessageScreen } from './src/screens/ShareMessageScreen/ShareMessageScreen';
import { ThreadScreen } from './src/screens/ThreadScreen';
import { UserPickerModal } from './src/screens/UserPickerModal/UserPickerModal';
import { HEADER_HEIGHT } from './src/utils';
import { ChatClientStore } from './src/utils/ChatClientStore';

LogBox.ignoreAllLogs();
const Tab = createBottomTabNavigator();

const RootStack = createStackNavigator();
const HomeStack = createStackNavigator();
const ModalStack = createStackNavigator();

const chatClient = ChatClientStore.client;
const defaultUser = {
  id: USER_ID,
  token: USER_TOKEN,
};

export default () => {
  const scheme = useColorScheme();
  const [connecting, setConnecting] = useState(true);
  const [currentUser, setCurrentUser] = useState(defaultUser);
  const [activeChannel, setActiveChannel] = useState(null);
  // For actionsheets
  const [activeMessage, setActiveMessage] = useState(null);
  const [userPickerVisible, setUserPickerVisible] = useState(false);

  const openUserPicker = () => setUserPickerVisible(true);
  const closeUserPicker = () => setUserPickerVisible(false);

  useEffect(() => {
    // Initializes Stream's chat client.
    // Documentation: https://getstream.io/chat/docs/init_and_users/?language=js
    const initChat = async () => {
      if (!defaultUser.id || !defaultUser.token) {
        Alert.alert(
          'Please set API_KEY, USER_ID and USER_TOKEN in .env file as mentioned in README file and restart the project',
        );
        return;
      }

      await chatClient.connectUser(
        {
          id: currentUser.id,
        },
        currentUser.token,
      );

      setConnecting(false);
    };

    setConnecting(true);
    initChat();

    return () => {
      chatClient && chatClient.disconnectUser();
    };
  }, [currentUser]);

  if (connecting) {
    return (
      <SafeAreaView>
        <View style={styles.loadingContainer}>
          <ActivityIndicator color='black' size='small' />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : LightTheme}>
        <View style={styles.container}>
          <SlackAppContext.Provider
            value={{
              activeChannel,
              activeMessage,
              openUserPicker,
              setActiveChannel,
              setActiveMessage,
              switchUser: (userId) => {
                /**
                 * Dev token generations will only work in case of development mode.
                 * So please make sure you have auth check disabled, if you are planning to
                 * check user picker feature.
                 */
                const token = chatClient.devToken(userId);
                setCurrentUser({
                  id: userId,
                  token,
                }),
                  setUserPickerVisible(false);
              },
            }}>
            <RootNavigation />
            <UserPickerModal
              label={'name'}
              modalVisible={userPickerVisible}
              onRequestClose={closeUserPicker}
              onValueChange={closeUserPicker}
            />
          </SlackAppContext.Provider>
        </View>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const ModalStackNavigator = () => (
  <ModalStack.Navigator>
    <ModalStack.Screen
      component={ChannelSearchScreen}
      name='ChannelSearchScreen'
      options={{ headerShown: false }}
    />
    <ModalStack.Screen
      component={JumpToSearchScreen}
      name='JumpToSearchScreen'
      options={{ headerShown: false }}
    />
    <ModalStack.Screen
      component={NewMessageScreen}
      name='NewMessageScreen'
      options={{ headerShown: false }}
    />
    <ModalStack.Screen
      component={ShareMessageScreen}
      name='ShareMessageScreen'
      options={{ headerShown: false }}
    />
  </ModalStack.Navigator>
);

const HomeStackNavigator = () => (
  <HomeStack.Navigator initialRouteName='ChannelListScreen'>
    <HomeStack.Screen
      component={ChannelListScreen}
      name='ChannelListScreen'
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      component={ChannelScreen}
      name='ChannelScreen'
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      component={DraftsScreen}
      name='DraftsScreen'
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      component={ThreadScreen}
      name='ThreadScreen'
      options={{ headerShown: false }}
    />
  </HomeStack.Navigator>
);

const TabNavigation = () => (
  <BottomSheetModalProvider>
    <Tab.Navigator tabBar={(props) => <BottomTabs {...props} />}>
      <Tab.Screen component={HomeStackNavigator} name='home' />
      <Tab.Screen component={DirectMessagesScreen} name={'dms'} />
      <Tab.Screen component={MentionsScreen} name={'mentions'} />
      <Tab.Screen component={MessageSearchScreen} name={'search'} />
      <Tab.Screen component={ProfileScreen} name={'you'} />
    </Tab.Navigator>
  </BottomSheetModalProvider>
);

const RootNavigation = () => {
  const chatStyles = useStreamChatTheme();
  const { bottom, top } = useSafeAreaInsets();

  return (
    <OverlayProvider bottomInset={bottom + HEADER_HEIGHT} topInset={top}>
      <Chat client={ChatClientStore.client} style={chatStyles}>
        <RootStack.Navigator mode='modal'>
          <RootStack.Screen
            component={TabNavigation}
            name='Tabs'
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            component={ModalStackNavigator}
            name={'Modals'}
            options={{ headerShown: false }}
          />
        </RootStack.Navigator>
      </Chat>
    </OverlayProvider>
  );
};

const styles = StyleSheet.create({
  channelScreenContainer: { flexDirection: 'column', height: '100%' },
  channelScreenSaveAreaView: {
    backgroundColor: 'white',
  },
  chatContainer: {
    backgroundColor: 'white',
    flexGrow: 1,
    flexShrink: 1,
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  drawerNavigator: {
    backgroundColor: '#3F0E40',
    width: 350,
  },
  loadingContainer: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
});
