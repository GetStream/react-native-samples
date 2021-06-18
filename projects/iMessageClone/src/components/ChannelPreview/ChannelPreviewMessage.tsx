import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {useTheme} from 'stream-chat-react-native';
import type {ChannelPreviewMessageProps} from 'stream-chat-react-native';

const styles = StyleSheet.create({
  bold: {fontWeight: 'bold'},
  message: {
    flexShrink: 1,
    fontSize: 12,
  },
});

export const ChannelPreviewMessage = ({
  latestMessagePreview,
}: ChannelPreviewMessageProps) => {
  const {
    theme: {
      colors: {grey},
    },
  } = useTheme();

  const lastMessagePreview = latestMessagePreview.previews[1];

  return lastMessagePreview ? (
    <Text
      numberOfLines={2}
      style={[
        styles.message,
        lastMessagePreview.bold ? styles.bold : {},
        {color: grey},
      ]}>
      {lastMessagePreview.text || null}
    </Text>
  ) : null;
};
