import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useTheme, Right} from 'stream-chat-react-native';
import type {ChannelPreviewStatusProps} from 'stream-chat-react-native';

const styles = StyleSheet.create({
  date: {
    fontSize: 12,
    marginLeft: 2,
    marginRight: 5,
    textAlign: 'right',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  svg: {
    maxWidth: 16,
    maxHeight: 16,
  },
});

export const ChannelPreviewStatus = React.memo(
  ({
    formatLatestMessageDate,
    latestMessagePreview,
  }: ChannelPreviewStatusProps) => {
    const {
      theme: {
        channelPreview: {date},
        colors: {grey},
      },
    } = useTheme();

    const created_at = latestMessagePreview.messageObject?.created_at;
    const latestMessageDate = created_at ? new Date(created_at) : new Date();

    return (
      <View style={styles.flexRow}>
        <Text style={[styles.date, {color: grey}, date]}>
          {formatLatestMessageDate && latestMessageDate
            ? formatLatestMessageDate(latestMessageDate)
            : latestMessagePreview.created_at}
        </Text>
        <Right width={16} style={styles.svg} pathFill={grey} />
      </View>
    );
  },
);
