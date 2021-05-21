import {
  useFocusEffect,
  useNavigation,
  useRoute,
  useTheme,
} from '@react-navigation/native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import {
  Channel,
  MessageInput,
  MessageList,
  MessageSimple,
  useMessageContext,
} from 'stream-chat-react-native';

import { CustomKeyboardCompatibleView } from '../../components/CustomKeyboardCompatibleView';
import { Gallery } from '../../components/Gallery';
import { InlineDateSeparator } from '../../components/InlineDateSeparator';
import { InlineUnreadIndicator } from '../../components/InlineUnreadIndicator';
import { InputBox } from '../../components/Input/InputBox';
import { MessageActionSheet } from '../../components/MessageActionSheet/MessageActionSheet';
import { MessageAvatar } from '../../components/MessageAvatar';
import { MessageFooter } from '../../components/MessageFooter';
import { MessageHeader } from '../../components/MessageHeader';
import { MessageRepliesAvatars } from '../../components/MessageRepliesAvatars';
import { MessageText } from '../../components/MessageText';
import { ReactionPickerActionSheet } from '../../components/ReactionPickerActionSheet/ReactionPickerActionSheet';
import { RenderNothing } from '../../components/RenderNothing';
import { UrlPreview } from '../../components/UrlPreview';
import { SlackAppContext } from '../../contexts/SlackAppContext';
import { useDraftMessage } from '../../hooks/useDraftMessage';
import { ChatClientStore } from '../../utils/ChatClientStore';
import { supportedReactions } from '../../utils/supportedReactions';
import { ChannelHeader } from './ChannelHeader';
import { JumpToRecentMessagesButton } from './JumpToRecentMessagesButton';

const styles = StyleSheet.create({
  channelScreenContainer: { flexDirection: 'column', height: '100%' },
  chatContainer: {
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
  recentMessageLink: {
    alignSelf: 'center',
    height: 60,
    paddingTop: 20,
    width: '100%',
  },
  recentMessageLinkText: {
    alignSelf: 'center',
    color: '#1E90FF',
    fontSize: 15,
  },
  touchableOpacityStyle: {
    alignItems: 'center',
    backgroundColor: '#3F0E40',
    borderColor: 'black',
    borderRadius: 30,
    borderWidth: 1,
    bottom: 80,
    height: 50,
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    width: 50,
  },
});

const MessageWithoutDeleted = React.memo(() => {
  const { message } = useMessageContext();

  if (message.type === 'deleted') {
    return null;
  }

  return <MessageSimple />;
});

const additionalFlatListProps = {
  windowSize: 10,
};

const chatClient = ChatClientStore.client;

export const ChannelScreen = () => {
  const navigation = useNavigation();
  const {
    params: { channelId = null, messageId = null },
  } = useRoute();
  const { colors } = useTheme();

  const {
    activeChannel: channel,
    setActiveChannel,
    setActiveMessage,
  } = useContext(SlackAppContext);
  const actionSheetRef = useRef(null);
  const reactionPickerRef = useRef(null);
  const messageListRef = useRef(null);

  const [activeThread, setActiveThread] = useState();
  const [draftText, setDraftText] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [text, setText] = useState('');
  const [actionSheetData, setActionSheetData] = useState(null);

  const { getDraftMessageText } = useDraftMessage(text, channel);

  const additionalTextInputProps = useMemo(
    () => ({
      placeholder:
        channel && channel.data.name
          ? 'Message #' + channel.data.name.toLowerCase().replace(' ', '_')
          : 'Message',
      placeholderTextColor: '#979A9A',
    }),
    [channel?.id, messageId],
  );

  /**
   * When `openReactionPicker` is called from MessageFooter,
   * it will give you access to corresponding message.
   *
   * @param {function} toggleReactionHandler
   */
  const openReactionPicker = (message) => {
    setActiveMessage(message);
    actionSheetRef.current?.dismiss();
    reactionPickerRef.current?.present();
  };

  const onChangeText = (text) => {
    setText(text);
  };

  /**
   * Open slack type actionsheet on long press.
   */
  const onLongPressMessage = ({ actionHandlers, message }) => {
    setActiveMessage(message);
    setActionSheetData({
      actionHandlers,
      openReactionPicker,
    });
    actionSheetRef.current?.present();
  };

  /**
   * Switch to ThreadScreen.
   *
   * @param thread {object} Message object corresponding to thread.
   */
  const openThread = useCallback(
    (thread) => {
      setActiveThread(thread);
      navigation.navigate('ThreadScreen', {
        channelId: channel.id,
        threadId: thread.id,
      });
    },
    [channel?.id, messageId],
  );

  /**
   * Jump to given message. The target message could be part of current channel
   * or a different channel. If it's a different channel, then switch to that
   * channel.
   *
   * @param {*} targetMessage
   */
  const goToMessage = (targetMessage) => {
    if (channel.cid !== targetMessage.cid) {
      navigation.setParams({
        channelId: targetMessage.cid.replace('messaging:', ''),
        messageId: targetMessage.id,
      });

      return;
    }

    const messages = channel.state.messages;
    const indexOfParentInMessageList = messages?.findIndex(
      (message) => message?.id === targetMessage.id,
    );

    try {
      if (messageListRef.current) {
        /**
         * Since the flatlist is inverted, we need to calculate the index from most recent message
         */
        messageListRef.current.scrollToIndex({
          index: messages.length - indexOfParentInMessageList - 1,
          viewPosition: 0.5,
        });
        return;
      }
    } catch (_) {
      // do nothing
    }
    navigation.setParams({
      channelId: channel?.id,
      messageId,
    });
  };

  const renderMessageFooter = () => (
    <MessageFooter
      goToMessage={goToMessage}
      openReactionPicker={openReactionPicker}
    />
  );

  const setFlatListRef = (ref) => {
    messageListRef.current = ref;
  };

  useEffect(() => {
    const init = async () => {
      if (!channelId) {
        navigation.goBack();
        return;
      }

      const newChannel = chatClient.channel('messaging', channelId);
      if (!newChannel.initialized) {
        await newChannel.watch();
      }

      setActiveChannel(newChannel);
      const draft = await getDraftMessageText(channelId);

      if (!draft) {
        setIsReady(true);
        return;
      }

      setDraftText(draft);
      setText(draft);
      setIsReady(true);
    };
    setIsReady(false);
    init();

    return () => {
      setActiveChannel(null);
    };
  }, [channelId, messageId]);

  useFocusEffect(() => {
    setActiveThread(undefined);
  });

  if (!isReady) {
    return null;
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
      }}>
      <View style={styles.channelScreenContainer}>
        <ChannelHeader channel={channel} goBack={navigation.goBack} />
        <View
          style={[
            styles.chatContainer,
            {
              backgroundColor: colors.background,
            },
          ]}>
          <Channel
            additionalTextInputProps={additionalTextInputProps}
            animatedLongPress={false}
            channel={channel}
            DateHeader={RenderNothing}
            forceAlignMessages={'left'}
            Gallery={Gallery}
            initialValue={draftText}
            InlineDateSeparator={InlineDateSeparator}
            InlineUnreadIndicator={InlineUnreadIndicator}
            Input={InputBox}
            InputButtons={RenderNothing}
            KeyboardCompatibleView={CustomKeyboardCompatibleView}
            maxTimeBetweenGroupedMessages={30000}
            MessageAvatar={MessageAvatar}
            MessageDeleted={RenderNothing}
            MessageFooter={renderMessageFooter}
            MessageHeader={MessageHeader}
            messageId={messageId}
            MessageRepliesAvatars={MessageRepliesAvatars}
            MessageSimple={MessageWithoutDeleted}
            MessageText={MessageText}
            onChangeText={onChangeText}
            onLongPressMessage={onLongPressMessage}
            onPressInMessage={RenderNothing}
            ReactionList={RenderNothing}
            Reply={RenderNothing}
            ScrollToBottomButton={
              messageId ? JumpToRecentMessagesButton : RenderNothing
            }
            supportedReactions={supportedReactions}
            thread={activeThread}
            UrlPreview={UrlPreview}>
            <MessageList
              additionalFlatListProps={additionalFlatListProps}
              onThreadSelect={openThread}
              setFlatListRef={setFlatListRef}
            />
            <MessageInput />
          </Channel>
          <MessageActionSheet {...actionSheetData} ref={actionSheetRef} />
          <ReactionPickerActionSheet ref={reactionPickerRef} />
        </View>
      </View>
    </SafeAreaView>
  );
};
