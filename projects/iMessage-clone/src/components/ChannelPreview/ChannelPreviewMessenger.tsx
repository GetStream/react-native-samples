import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity, Swipeable} from 'react-native-gesture-handler';
import {
  useTheme,
  useChannelPreviewDisplayName,
  useChannelsContext,
  ChannelAvatar,
  ChannelPreviewTitle,
  RootSvg,
  RootPath,
  IconProps,
} from 'stream-chat-react-native';
import type {ChannelPreviewMessengerProps} from 'stream-chat-react-native';

import {formatLatestMessageDate} from '../../utils';

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

const TrashCan: React.FC<IconProps> = props => (
  <RootSvg {...props} viewBox="0 0 18 19">
    <RootPath
      d="M5.05713 18.2163H12.9512C13.9805 18.2163 14.603 17.6436 14.6445 16.6143L15.1758 4.48682H16.4209C16.7612 4.48682 17.0352 4.19629 17.0352 3.85596C17.0352 3.51562 16.7612 3.2334 16.4209 3.2334H12.6357V1.98828C12.6357 0.792969 11.8306 0.0292969 10.5522 0.0292969H7.44775C6.16943 0.0292969 5.37256 0.792969 5.37256 1.98828V3.2334H1.5791C1.24707 3.2334 0.964844 3.52393 0.964844 3.85596C0.964844 4.19629 1.24707 4.48682 1.5791 4.48682H2.84082L3.37207 16.6143C3.41357 17.6436 4.02783 18.2163 5.05713 18.2163ZM6.70068 3.2334V2.07129C6.70068 1.59814 7.04102 1.26611 7.54736 1.26611H10.4609C10.9673 1.26611 11.3159 1.59814 11.3159 2.07129V3.2334H6.70068ZM5.53857 15.3193L5.16504 6.27148C5.14844 5.92285 5.39746 5.66553 5.71289 5.66553C6.00342 5.66553 6.25244 5.93945 6.26904 6.27148L6.60938 15.3193C6.61768 15.6597 6.38525 15.9336 6.06152 15.9336C5.7627 15.9336 5.54688 15.6846 5.53857 15.3193ZM8.44385 15.3193L8.43555 6.27148C8.43555 5.93945 8.70117 5.66553 9 5.66553C9.30713 5.66553 9.57275 5.93945 9.57275 6.27148V15.3193C9.57275 15.6597 9.29883 15.9336 9 15.9336C8.70117 15.9336 8.44385 15.6597 8.44385 15.3193ZM11.4072 15.3193L11.7476 6.27148C11.7559 5.93945 12.0049 5.66553 12.3037 5.66553C12.6108 5.66553 12.8599 5.92285 12.8516 6.27148L12.478 15.3193C12.4697 15.6846 12.2456 15.9336 11.9385 15.9336C11.623 15.9336 11.3989 15.6597 11.4072 15.3193Z"
      {...props}
    />
  </RootSvg>
);

const Mute: React.FC<IconProps> = props => (
  <RootSvg {...props} viewBox="0 0 17 18">
    <RootPath
      d="M7.9834 0.390625C6.75488 0.390625 5.8999 1.25391 5.58447 2.33301C5.14453 2.48242 4.7627 2.68994 4.43896 2.95557L15.6035 14.1367C15.7446 13.979 15.811 13.7798 15.811 13.5391C15.811 12.709 14.9727 11.9619 14.2505 11.2231C13.7026 10.6504 13.5532 9.47168 13.4951 8.51709C13.4287 5.32959 12.5903 3.12988 10.3823 2.33301C10.0669 1.25391 9.20361 0.390625 7.9834 0.390625ZM15.2466 16.9756C15.4956 17.2246 15.9023 17.2246 16.1514 16.9756C16.3921 16.7183 16.4004 16.3198 16.1514 16.0708L1.24316 1.1709C0.994141 0.921875 0.587402 0.921875 0.330078 1.1709C0.0893555 1.41992 0.0893555 1.83496 0.330078 2.07568L15.2466 16.9756ZM1.40088 14.5435H11.4199L2.76221 5.86914C2.57959 6.65771 2.48828 7.5293 2.47168 8.51709C2.40527 9.47168 2.26416 10.6504 1.71631 11.2231C0.994141 11.9619 0.147461 12.709 0.147461 13.5391C0.147461 14.1367 0.620605 14.5435 1.40088 14.5435ZM7.9834 17.8638C9.38623 17.8638 10.4155 16.8345 10.5317 15.6724H5.43506C5.54297 16.8345 6.57227 17.8638 7.9834 17.8638Z"
      {...props}
    />
  </RootSvg>
);

const Unmute: React.FC<IconProps> = props => (
  <RootSvg {...props} viewBox="0 0 16 18">
    <RootPath
      d="M1.41748 14.5435H14.5742C15.3545 14.5435 15.8276 14.1367 15.8276 13.5391C15.8276 12.709 14.981 11.9619 14.2671 11.2231C13.7192 10.6504 13.5698 9.47168 13.5034 8.51709C13.4453 5.32959 12.5986 3.12988 10.3906 2.33301C10.0752 1.25391 9.22021 0.390625 7.9917 0.390625C6.77148 0.390625 5.9082 1.25391 5.60107 2.33301C3.39307 3.12988 2.54639 5.32959 2.48828 8.51709C2.42188 9.47168 2.27246 10.6504 1.72461 11.2231C1.00244 11.9619 0.164062 12.709 0.164062 13.5391C0.164062 14.1367 0.628906 14.5435 1.41748 14.5435ZM7.9917 17.8638C9.40283 17.8638 10.4321 16.8345 10.54 15.6724H5.45166C5.55957 16.8345 6.58887 17.8638 7.9917 17.8638Z"
      {...props}
    />
  </RootSvg>
);

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
    <Swipeable renderRightActions={renderRightActions} overshootRight={false}>
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
