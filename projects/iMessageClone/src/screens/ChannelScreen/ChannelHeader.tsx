import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {isOwnUser} from 'stream-chat';
import {
  ChannelAvatar,
  useChannelPreviewDisplayName,
  useTheme,
} from 'stream-chat-react-native';
import type {Channel as ChannelType} from 'stream-chat';

import {AppContext} from '../../contexts';
import {BackButton} from '../../icons';

import {NavigationParamsList} from '../Screens';

export const CHANNEL_SCREEN_HEADER_HEIGHT = 80;

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    paddingHorizontal: 8,
    flex: 1,
  },
  leftContainer: {
    flex: 1,
  },
  backButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  counterBadge: {
    borderRadius: 20,
    paddingHorizontal: 5,
  },
  rightContainer: {
    flex: 1,
  },
  middleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export type ChannelHeader = {
  channel?: ChannelType;
  navigation: StackNavigationProp<NavigationParamsList, 'Main'>;
};

export const ChannelHeader: React.FC<ChannelHeader> = ({
  channel,
  navigation,
}) => {
  const displayName = useChannelPreviewDisplayName(channel);
  const {chatClient} = useContext(AppContext);
  const [count, setCount] = useState<number>();
  const {
    theme: {
      colors: {accent_blue, white},
    },
  } = useTheme();

  useEffect(() => {
    const user = chatClient?.user;
    const unreadCount = isOwnUser(user) ? user.total_unread_count : undefined;
    setCount(unreadCount);
    const listener = chatClient?.on(e => {
      if (e.total_unread_count) {
        setCount(e.total_unread_count);
      }
    });

    return () => {
      if (listener) {
        listener.unsubscribe();
      }
    };
  }, [chatClient]);

  return (
    <>
      <View style={[styles.container]}>
        <View style={[styles.middleContainer]}>
          <View style={styles.leftContainer}>
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
              <View style={styles.backButtonContainer}>
                <BackButton pathFill={accent_blue} width={22} />
                {count ? (
                  <View
                    style={[
                      styles.counterBadge,
                      {backgroundColor: accent_blue},
                    ]}>
                    <Text style={{color: white}}>{count}</Text>
                  </View>
                ) : null}
              </View>
            </TouchableWithoutFeedback>
          </View>
          {channel && <ChannelAvatar channel={channel} />}
          <View style={styles.rightContainer} />
        </View>
        <Text style={[styles.text]}>{displayName}</Text>
      </View>
    </>
  );
};
