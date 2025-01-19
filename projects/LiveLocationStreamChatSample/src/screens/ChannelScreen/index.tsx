import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {useEffect} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  useAttachmentPickerContext,
  useOverlayContext,
  Channel,
  MessageList,
  MessageInput,
} from 'stream-chat-react-native';
import {useHeaderHeight} from '@react-navigation/elements';
import {NavigationParamsList, StreamChatGenerics} from '../../common/types';
import {useAppContext} from '../../common/AppContext';
import InputButtons from './InputButtons';
import Card, {isAttachmentEqualHandler} from './Card';

type ChannelScreenProps = StackScreenProps<NavigationParamsList, 'Channel'>;

const ChannelScreen: React.FC<ChannelScreenProps> = ({navigation}) => {
  const {channel, setThread, thread} = useAppContext();
  const headerHeight = useHeaderHeight();
  const {setTopInset} = useAttachmentPickerContext();
  const {overlay} = useOverlayContext();

  useEffect(() => {
    navigation.setOptions({
      gestureEnabled: Platform.OS === 'ios' && overlay === 'none',
    });
  }, [overlay, navigation]);

  useEffect(() => {
    setTopInset(headerHeight);
  }, [headerHeight, setTopInset]);

  if (!channel) {
    throw new Error('ChannelScreen - Channel is not defined');
  }

  const onPressMessage: NonNullable<
    React.ComponentProps<typeof Channel<StreamChatGenerics>>['onPressMessage']
  > = payload => {
    const {message, defaultHandler, emitter} = payload;
    if (emitter === 'messageContent') {
      if (message?.attachments?.[0]?.type === 'location') {
        navigation.navigate('MapDetail', {
          messageId: message.id,
          latitude: message.attachments[0].latitude!,
          longitude: message.attachments[0].longitude!,
          ended_at: message.attachments[0].ended_at,
        });
      }
    }
    defaultHandler?.();
  };

  return (
    <SafeAreaView edges={['bottom']}>
      <Channel
        channel={channel}
        InputButtons={InputButtons}
        Card={Card}
        keyboardVerticalOffset={headerHeight}
        onPressMessage={onPressMessage}
        isAttachmentEqual={isAttachmentEqualHandler}
        thread={thread}>
        <View style={styles.container}>
          <MessageList<StreamChatGenerics>
            onThreadSelect={selectedThread => {
              setThread(selectedThread);
              if (channel?.id) {
                navigation.navigate('Thread');
              }
            }}
          />
          <MessageInput />
        </View>
      </Channel>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChannelScreen;
