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
  IconProps,
  RootSvg,
  RootPath,
  ChannelProps,
} from 'stream-chat-react-native';

import {myMessageTheme} from '../../theme';
import {AppContext} from '../../contexts/AppContext';

import {InlineDateSeparator} from './InlineDateSeparator';
import {InputButtons} from './InputButtons';
import {SendButton} from './SendButton';

export const HahaReaction: React.FC<IconProps> = props => (
  <RootSvg height={21} width={21} {...props} viewBox="0 0 24 24">
    <RootPath
      d="M6.79415 9.23318H5.25167C5.26196 11.7423 4.26792 15.0226 1.98848 13.7441C-0.0407251 12.8186 -0.781113 3.65285 1.02872 1.83959C2.5712 0.293687 4.36389 1.73333 4.80264 4.85941C4.81779 4.97524 4.82848 5.07422 4.83761 5.15875C4.86377 5.40107 4.87711 5.52458 4.94589 5.58565C5.01737 5.64914 5.14876 5.64517 5.41673 5.63709C5.49291 5.63479 5.58012 5.63216 5.68014 5.63065H6.45138C6.50628 5.25627 6.53131 4.85767 6.55659 4.45498L6.55659 4.45496L6.55659 4.45494C6.63547 3.1985 6.71684 1.90226 7.7162 1.17804C13.3548 -0.700351 11.9254 12.5855 10.0573 13.3979C8.09325 14.5564 7.06151 12.0336 6.79415 9.23318ZM16.1525 1.69583C17.8389 0.502982 19.9538 1.80551 21.0233 4.69508C23.5941 11.6431 23.6386 13.2644 21.2667 13.2644C20.4234 13.2644 20.3892 13.2438 19.354 12.0304C18.5 11 16.5 11 15.5 12C14.5 13 12.5122 14.6268 12.502 12.0064C12.5005 11.6339 12.5592 11.0584 12.6281 10.3817L12.6281 10.3817C12.6529 10.1384 12.6791 9.88201 12.7042 9.61729C13.0003 6.5 15.4772 2.0009 16.1525 1.69583ZM16.8997 7.32757C16.4541 8.70552 16.4953 8.80835 17.503 8.80835C18.3565 8.80835 18.4718 8.42545 18.3497 8.10566C18.3237 8.03778 18.3011 7.98038 18.2812 7.93016L18.2811 7.92984C18.2075 7.7437 18.173 7.65634 18.1564 7.5C18.1502 7.44131 18.1458 7.38292 18.1414 7.32485L18.1414 7.32479L18.1414 7.32472C18.1246 7.1027 18.1081 6.88523 17.9932 6.67288C17.6504 5.91878 17.2836 6.13815 16.8997 7.32757ZM16.4769 14.6595C14.0535 15.0023 11.0406 27.4346 15.3458 23.0197C16.5 22 17.69 22.0385 18.345 22.5192C19 23 22.3315 24.7335 21.4608 21.4189C20.9192 19.3863 18.89 12.9662 16.4769 14.6595ZM17.0562 20.4318C15.7468 20.4729 17.0871 17.1446 17.6629 19.3589C17.9303 20.2672 17.7897 20.514 17.0562 20.4318ZM8.21613 17.0863C8.26069 15.9311 8.30182 15.8146 8.87425 15.2421C12.7716 12.5994 12.0483 21.2989 11.7981 22.7248C11.0371 25.0111 8.61717 24.257 8.60004 21.7308C8.59318 20.7368 7.39005 20.5311 7.19467 21.4909C6.73536 23.7463 6.62567 24.0068 6.00525 24.329C4.28454 25.2202 3.00942 21.5971 3.4516 17.0794C3.77723 13.7408 6.38916 14.4195 6.92045 17.9775C6.89558 18.3478 7.4834 18.3326 7.90255 18.3218C8.0033 18.3193 8.0943 18.3169 8.16471 18.3202L8.21613 17.0863Z"
      {...props}
    />
  </RootSvg>
);

export const QuestionReaction: React.FC<IconProps> = props => (
  <RootSvg height={21} width={21} {...props} viewBox="0 0 24 24">
    <RootPath
      d="M6.71647 7.74398C4.3152 5.09321 8.41588 -0.0805922 12.1318 0.0365103C18.5803 -0.634167 21.7119 8.10949 16.0436 11.9277C14.9463 12.6765 14.2623 13.4714 14.2623 14.0072C14.2623 16.0796 11.7577 17.027 10.2507 15.526C9.16761 14.4472 9.79465 10.157 11.038 10.157C12.6876 9.03921 16.1505 6.45586 13.7065 4.73126C11.7755 3.71992 10.9703 5.06837 9.71271 7.20106C9.36 7.80431 7.50026 8.52467 6.71647 7.74398ZM10.7073 18.6985C8.11365 20.2634 8.86182 24 11.769 24C16.397 23.6203 14.3163 16.9064 10.7073 18.6985Z"
      {...props}
    />
  </RootSvg>
);

export const ExclamationReaction: React.FC<IconProps> = props => (
  <RootSvg height={21} width={21} {...props} viewBox="0 0 24 24">
    <RootPath
      d="M12.8677 9.80382C12.3344 3.99256 12.7412 1.22025 14.2589 0.341725C19.6463 -1.21022 21.1675 2.58761 17.6944 10.7439C16.5322 15.157 13.5787 16.2441 12.8677 9.80382ZM13.062 16.7706C10.4674 19.0029 12.8227 22.8041 15.8309 21.2487C18.5109 19.3379 16.4427 14.8358 13.062 16.7706ZM7.14759 18.7702C4.91538 20.1308 6.62457 23.7987 9.10632 22.9646C11.9265 22.0177 10.0908 16.8423 7.14759 18.7702ZM5.81438 4.31411C7.61245 3.63043 9.58828 4.56365 9.91987 6.25233C10.7574 13.0276 8.29955 24.4894 4.17697 8.93577C3.80779 7.11719 3.85906 4.88156 5.81438 4.31411Z"
      {...props}
    />
  </RootSvg>
);

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
