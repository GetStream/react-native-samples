import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity, Swipeable} from 'react-native-gesture-handler';
import {
  useTheme,
  useChannelPreviewDisplayName,
  useChannelsContext,
  ChannelAvatar,
  ChannelPreviewTitle,
} from 'stream-chat-react-native';
import type {ChannelPreviewMessengerProps} from 'stream-chat-react-native';

import {formatLatestMessageDate} from '../../utils';
import {TrashCan, Mute, Unmute} from '../../icons';

import {ChannelPreviewStatus} from './ChannelPreviewStatus';
import {ChannelPreviewMessage} from './ChannelPreviewMessage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingHorizontal: 8,
  },
  actionContainer: {
    flex: 1,
  },
  actionButton: {
    minWidth: 70,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    height: 60,
    flex: 1,
    borderBottomWidth: 1,
  },
  avatarContainer: {
    marginRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {fontSize: 14, fontWeight: '700', flex: 1, marginBottom: 3},
  circle: {
    width: 8,
    height: 8,
    borderRadius: 50,
    alignSelf: 'center',
    marginRight: 10,
  },
  circleFill: {
    backgroundColor: '#147EFB',
  },
});

export const ChannelPreviewMessenger = (
  props: ChannelPreviewMessengerProps,
) => {
  const {
    channel,
    latestMessagePreview,
    PreviewAvatar = ChannelAvatar,
    PreviewMessage = ChannelPreviewMessage,
    PreviewStatus = ChannelPreviewStatus,
    PreviewTitle = ChannelPreviewTitle,
    unread,
  } = props;

  const {
    theme: {
      channelPreview: {container, contentContainer, row},
      colors: {border, white_snow, accent_red},
    },
  } = useTheme();

  const displayName = useChannelPreviewDisplayName(channel);
  const {onSelect} = useChannelsContext();

  const [muted, setMuted] = useState(channel.muteStatus().muted);

  const mute = useCallback(async () => {
    setMuted(true);
    await channel.mute();
  }, [channel]);

  const unmute = useCallback(async () => {
    setMuted(false);
    await channel.unmute();
  }, [channel]);

  const renderRightActions = useCallback(
    (_, dragX) => {
      const trans = dragX.interpolate({
        inputRange: [-100, 0],
        outputRange: [0.7, 0],
      });

      return (
        <>
          <TouchableOpacity
            onPress={() => channel.delete()}
            style={[
              styles.actionContainer,
              {transform: [{translateX: trans}]},
            ]}>
            <View style={[styles.actionButton, {backgroundColor: accent_red}]}>
              <TrashCan pathFill="white" height={21} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => (muted ? unmute() : mute())}
            style={[
              styles.actionContainer,
              {transform: [{translateX: trans}]},
            ]}>
            <View style={[styles.actionButton, {backgroundColor: '#4f4dc1'}]}>
              {muted ? (
                <Unmute pathFill="white" height={21} />
              ) : (
                <Mute pathFill="white" height={21} />
              )}
            </View>
          </TouchableOpacity>
        </>
      );
    },
    [accent_red, channel, mute, muted, unmute],
  );

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      overshootRight={false}
      overshootLeft={false}>
      <TouchableOpacity
        onPress={() => {
          if (onSelect) {
            onSelect(channel);
          }
        }}
        style={[{backgroundColor: white_snow}, container, styles.container]}
        testID="channel-preview-button">
        <View style={[styles.avatarContainer]}>
          <View
            style={[styles.circle, unread ? styles.circleFill : undefined]}
          />
          <PreviewAvatar channel={channel} />
        </View>

        <View
          style={[
            styles.contentContainer,
            contentContainer,
            {borderColor: border},
          ]}>
          <View style={[styles.row, row]}>
            <View style={[styles.title]}>
              <PreviewTitle channel={channel} displayName={displayName} />
            </View>
            <PreviewStatus
              channel={channel}
              formatLatestMessageDate={formatLatestMessageDate}
              latestMessagePreview={latestMessagePreview}
            />
          </View>
          <View style={[styles.row, row]}>
            <PreviewMessage latestMessagePreview={latestMessagePreview} />
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};
