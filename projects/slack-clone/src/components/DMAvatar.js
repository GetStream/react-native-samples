import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { ChatClientStore } from '../utils/ChatClientStore';
import { PresenceIndicator } from './PresenceIndicator';

const styles = StyleSheet.create({
  avatarImage: {
    borderRadius: 5,
    height: 45,
    width: 45,
  },
  presenceIndicatorContainer: {
    borderRadius: 100 / 2,
    borderWidth: 3,
    bottom: -5,
    position: 'absolute',
    right: -10,
  },
  stackedAvatarContainer: {
    height: 45,
    marginTop: 5,
    width: 45,
  },
  stackedAvatarImage: {
    borderRadius: 5,
    height: 31,
    width: 31,
  },
  stackedAvatarTopImage: {
    borderWidth: 3,
    bottom: 0,
    position: 'absolute',
    right: 0,
  },
});

const chatClient = ChatClientStore.client;

export const DMAvatar = ({ channel }) => {
  const { colors } = useTheme();
  const otherMembers = Object.values(channel.state.members).filter(
    (m) => m.user.id !== chatClient.user.id,
  );

  if (otherMembers.length >= 2) {
    return (
      <View style={styles.stackedAvatarContainer}>
        <Image
          source={{
            uri: otherMembers[0].user.image,
          }}
          style={styles.stackedAvatarImage}
        />
        <Image
          source={{
            uri: otherMembers[1].user.image,
          }}
          style={[
            styles.stackedAvatarImage,
            styles.stackedAvatarTopImage,
            {
              borderColor: colors.background,
            },
          ]}
        />
      </View>
    );
  }

  return (
    <View style={styles.avatarImage}>
      <Image
        source={{
          uri: otherMembers[0].user.image,
        }}
        style={styles.avatarImage}
      />
      <View
        style={[
          styles.presenceIndicatorContainer,
          {
            borderColor: colors.background,
          },
        ]}>
        <PresenceIndicator
          backgroundTransparent={false}
          online={otherMembers[0].user.online}
        />
      </View>
    </View>
  );
};
