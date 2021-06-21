import { useTheme } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Channel, MessageInput, MessageList } from 'stream-chat-react-native';

import { CustomKeyboardCompatibleView } from '../../components/CustomKeyboardCompatibleView';
import { InputBox } from '../../components/Input/InputBox';
import { MessageAvatar } from '../../components/MessageAvatar';
import { MessageFooter } from '../../components/MessageFooter';
import { MessageHeader } from '../../components/MessageHeader';
import { MessageRepliesAvatars } from '../../components/MessageRepliesAvatars';
import { MessageText } from '../../components/MessageText';
import { ModalScreenHeader } from '../../components/ModalScreenHeader';
import { RenderNothing } from '../../components/RenderNothing';
import { UrlPreview } from '../../components/UrlPreview';
import { ChatClientStore } from '../../utils/ChatClientStore';
import { supportedReactions } from '../../utils/supportedReactions';
import { UserSearch } from './UserSearch/UserSearch';

const styles = StyleSheet.create({
  channelContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  container: {
    flexDirection: 'column',
    height: '100%',
  },
});

const getMessageInputPlaceholderText = (channel) => {
  channel && channel.data.name
    ? 'Message #' + channel.data.name.toLowerCase().replace(' ', '_')
    : 'Start a new message';
};

const getChannelUsingMembers = async (client, members) => {
  // Create a channel with selected users (as members)
  const newChannel = client.channel('messaging', {
    example: 'slack-demo',
    members,
    name: '',
  });

  await newChannel.watch();

  return newChannel;
};

export const NewMessageScreen = () => {
  const selectedUsers = useRef([]);
  const [channel, setChannel] = useState(null);
  const navigation = useNavigation();
  const chatClient = ChatClientStore.client;

  const [focusOnSearch, setFocusOnSearch] = useState(true);
  const { colors } = useTheme();

  const additionalTextInputProps = useMemo(
    () => ({
      /**
       * When message input is focused, switch to channel with selected members.
       */
      onFocus: async () => {
        setFocusOnSearch(false);
        const newChannel = await getChannelUsingMembers(chatClient, [
          ...selectedUsers.current.map((t) => t.id),
          chatClient.user.id,
        ]);
        setChannel(newChannel);
      },

      placeholder: getMessageInputPlaceholderText(channel),
      placeholderTextColor: colors.dimmedText,
    }),
    [channel],
  );

  /**
   * As soon as we send a message, navigate to ChannelScreen.
   *
   * @param {*} channelId
   * @param {*} message
   * @returns
   */
  const sendMessageAndNavigateToChannel = async (channelId, message) => {
    const res = await channel.sendMessage(message);
    navigation.navigate('ChannelScreen', {
      channelId: channel.id,
    });
    return res;
  };

  /**
   * Keep track of selected users, when user is remove or added to selected users.
   * @param {*} updatedUsers
   */
  const onUsersChange = (updatedUsers) => {
    selectedUsers.current = updatedUsers;
  };

  useEffect(() => {
    const dummyChannel = chatClient.channel('dummy', 'dummy');

    // Channel component starts watching the channel, if its not initialized.
    // So this is kind of a ugly hack to trick it into believing that we have initialized the channel already,
    // so it won't make a call to channel.watch() internally.
    dummyChannel.initialized = true;
    setChannel(dummyChannel);
  }, [chatClient]);

  if (!channel) {
    return null;
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
        height: '100%',
      }}>
      <View style={styles.container}>
        <ModalScreenHeader goBack={navigation.goBack} title='New Message' />
        <View style={styles.channelContainer}>
          <Channel
            additionalTextInputProps={additionalTextInputProps}
            channel={channel}
            doSendMessageRequest={sendMessageAndNavigateToChannel}
            forceAlignMessages={'left'}
            Input={InputBox}
            KeyboardCompatibleView={CustomKeyboardCompatibleView}
            MessageAvatar={MessageAvatar}
            MessageDeleted={RenderNothing}
            MessageFooter={MessageFooter}
            MessageHeader={MessageHeader}
            MessageRepliesAvatars={MessageRepliesAvatars}
            MessageText={MessageText}
            onLongPressMessage={RenderNothing}
            onPressInMessage={RenderNothing}
            ReactionList={RenderNothing}
            supportedReactions={supportedReactions}
            UrlPreview={UrlPreview}>
            <UserSearch
              onFocus={setFocusOnSearch.bind(null, true)}
              onUsersChange={onUsersChange}
            />
            {!focusOnSearch && <MessageList />}
            <MessageInput />
          </Channel>
        </View>
      </View>
    </SafeAreaView>
  );
};
