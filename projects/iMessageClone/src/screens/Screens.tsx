import React, {useContext} from 'react';
import {StatusBar, View} from 'react-native';
import {NavigatorScreenParams} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Channel, useTheme} from 'stream-chat-react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {AppContext} from '../contexts';

import {
  ChannelListScreen,
  ChannelListHeader,
  CHANNEL_LIST_SCREEN_HEADER_HEIGHT,
} from './ChannelListScreen';
import {
  ChannelScreen,
  ChannelHeader,
  CHANNEL_SCREEN_HEADER_HEIGHT,
} from './ChannelScreen';
import {NewMessageScreen} from './NewMessageScreen';

// Navigation types
export type NavigationParamsList = {
  Main: NavigatorScreenParams<{
    Channel: undefined;
    ChannelList: undefined;
  }>;
  NewMessage: undefined;
};

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

const MainStackScreen = () => {
  const {channel} = useContext(AppContext);
  const insets = useSafeAreaInsets();

  const {
    theme: {
      colors: {white_snow},
    },
  } = useTheme();

  return (
    <MainStack.Navigator
      initialRouteName="ChannelList"
      screenOptions={{headerMode: 'screen'}}>
      <MainStack.Screen
        component={ChannelScreen}
        name="Channel"
        options={() => {
          return {
            header: props =>
              !!insets.top && (
                <>
                  <StatusBar
                    backgroundColor="transparent"
                    translucent
                    barStyle="dark-content"
                  />
                  <View
                    style={{
                      paddingTop: insets.top,
                      height: CHANNEL_SCREEN_HEADER_HEIGHT + insets.top,
                    }}>
                    <Channel channel={channel}>
                      <ChannelHeader {...props} channel={channel} />
                    </Channel>
                  </View>
                </>
              ),
          };
        }}
      />
      <MainStack.Screen
        component={ChannelListScreen}
        name="ChannelList"
        options={{
          header: () => (
            <>
              <StatusBar
                backgroundColor="transparent"
                translucent
                barStyle="dark-content"
              />
              <View
                style={{
                  paddingTop: insets.top,
                  height: CHANNEL_LIST_SCREEN_HEADER_HEIGHT + insets.top,
                  backgroundColor: white_snow,
                }}>
                <ChannelListHeader />
              </View>
            </>
          ),
        }}
      />
    </MainStack.Navigator>
  );
};

export const Screens = () => {
  const insets = useSafeAreaInsets();

  const {
    theme: {
      colors: {grey_whisper},
    },
  } = useTheme();

  return (
    <RootStack.Navigator screenOptions={{presentation: 'modal'}}>
      <RootStack.Screen
        name="Main"
        component={MainStackScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        component={NewMessageScreen}
        name="NewMessage"
        options={{
          header: () => (
            <View
              style={{
                height: insets.top,
                backgroundColor: grey_whisper,
              }}>
              <StatusBar
                barStyle="dark-content"
                backgroundColor={grey_whisper}
              />
            </View>
          ),
        }}
      />
    </RootStack.Navigator>
  );
};
