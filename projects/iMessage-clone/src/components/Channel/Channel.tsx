import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';

import {
  Channel as StreamChannel,
  MessageInput,
  MessageList,
  LoveReaction,
  ThumbsUpReaction,
  ThumbsDownReaction,
  ChannelProps,
} from 'stream-chat-react-native';

import {myMessageTheme} from '../../theme';
import {HahaReaction, QuestionReaction, ExclamationReaction} from '../../icons';
import {AppContext} from '../../contexts/AppContext';

import {InlineDateSeparator} from './InlineDateSeparator';
import {InputButtons} from './InputButtons';
import {SendButton} from './SendButton';

const SUPPORTED_REACTIONS = [
  {
    Icon: LoveReaction,
    type: 'love',
  },
  {
    Icon: ThumbsUpReaction,
    type: 'like',
  },
  {
    Icon: ThumbsDownReaction,
    type: 'sad',
  },
  {
    Icon: HahaReaction,
    type: 'hahaha',
  },
  {
    Icon: QuestionReaction,
    type: 'question',
  },
  {
    Icon: ExclamationReaction,
    type: 'exclamation',
  },
];

export const Channel: React.FC<ChannelProps> = ({
  children = (
    <View style={StyleSheet.absoluteFill}>
      <MessageList
        StickyHeader={() => null}
        InlineDateSeparator={InlineDateSeparator}
      />
      <MessageInput />
    </View>
  ),
  ...props
}) => {
  const {channel, messageId} = useContext(AppContext);
  const headerHeight = useHeaderHeight();

  return (
    <StreamChannel
      MessageReplies={() => null}
      messageId={messageId}
      messageActions={({isMyMessage, copyMessage, deleteMessage}) => {
        const acceptedActions = [copyMessage];
        if (isMyMessage) {
          acceptedActions.push(deleteMessage);
        }
        return acceptedActions;
      }}
      supportedReactions={SUPPORTED_REACTIONS}
      channel={channel}
      myMessageTheme={myMessageTheme}
      keyboardVerticalOffset={headerHeight}
      MessageAvatar={() => null}
      enforceUniqueReaction
      allowThreadMessagesInChannel={false}
      InputButtons={InputButtons}
      SendButton={SendButton}
      {...props}>
      {children}
    </StreamChannel>
  );
};
