import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { JumpToButton } from '../../components/JumpToButton';
import { NewMessageBubble } from '../../components/NewMessageBubble';
import { ChatClientStore } from '../../utils/ChatClientStore';
import { ScreenHeader } from '../ScreenHeader';
import { SlackChannelList } from './SlackChannelList';

const chatClient = ChatClientStore.client;
export const ChannelListScreen = () => {
  const { colors } = useTheme();

  return (
    <>
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
          },
        ]}>
        <ScreenHeader showLogo title='places' />
        <JumpToButton />

        <View style={styles.listContainer}>
          <SlackChannelList client={chatClient} />
        </View>
      </View>
      <NewMessageBubble />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
});
