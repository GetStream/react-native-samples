import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Avatar, useTheme, vw, Right} from 'stream-chat-react-native';
import type {MessageResponse} from 'stream-chat';

import {formatLatestMessageDate} from '../../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingHorizontal: 8,
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

  date: {
    fontSize: 12,
    marginLeft: 2,
    textAlign: 'right',
  },
  detailsText: {fontSize: 12},
  flex: {flex: 1},
  indicatorContainer: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  itemContainer: {
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  message: {
    flexShrink: 1,
    fontSize: 12,
  },
  titleContainer: {
    maxWidth: vw(80) - 16 - 40,
  },
  svg: {
    maxWidth: 16,
    maxHeight: 16,
  },
});

type MessageSearchListProps = {
  item: MessageResponse;
  setChannelWithId: (channelId: string, messageId?: string) => Promise<void>;
};
export const MessageSearchItem: React.FC<MessageSearchListProps> = ({
  item,
  setChannelWithId,
}) => {
  const navigation = useNavigation();
  const {
    theme: {
      colors: {black, border, grey},
    },
  } = useTheme();

  return (
    <TouchableOpacity
      onPress={() => {
        if (item.channel?.id) {
          setChannelWithId(item.channel?.id, item.id);
          navigation.navigate('Channel');
        }
      }}
      style={[styles.container, {borderBottomColor: border}]}
      testID="channel-preview-button">
      <View style={[styles.avatarContainer]}>
        <Avatar
          image={item.user?.image as string}
          name={item.user?.name}
          size={40}
        />
      </View>

      <View style={[styles.contentContainer, {borderColor: border}]}>
        <View style={[styles.row]}>
          <Text
            numberOfLines={1}
            style={[styles.titleContainer, {color: black}]}>
            <Text style={styles.title}>{`${item.user?.name} `}</Text>
            {!!item.channel?.name && (
              <Text style={styles.detailsText}>
                in
                <Text style={styles.title}>{` ${item.channel?.name}`}</Text>
              </Text>
            )}
          </Text>
          <View style={styles.row}>
            <Text style={[styles.date, {color: grey}]}>
              {formatLatestMessageDate(item.created_at)}
            </Text>
            <Right width={16} style={styles.svg} pathFill={grey} />
          </View>
        </View>
        <View style={[styles.row]}>
          <Text
            numberOfLines={2}
            style={[
              styles.message,
              {
                color: grey,
              },
            ]}>
            {item.text}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
