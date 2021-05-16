import { useTheme } from '@react-navigation/native';
import React, { useContext } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { SCText } from '../../components/SCText';
import { SlackAppContext } from '../../contexts/SlackAppContext';
import { ChatClientStore } from '../../utils/ChatClientStore';

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 17,
    height: 35,
    width: 35,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
  },
  currentUserSubtext: {
    color: '#32CD32',
    fontSize: 12,
    fontStyle: 'italic',
  },
  userId: {
    fontSize: 10,
    paddingLeft: 20,
  },
});

const chatClient = ChatClientStore.client;
export const UserListItem = ({ user }) => {
  const { colors } = useTheme();
  const { switchUser } = useContext(SlackAppContext);

  return (
    <TouchableOpacity
      onPress={() => {
        switchUser(user.id);
      }}
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundSecondary,
        },
      ]}
      underlayColor={'transparent'}>
      <Image source={{ uri: user.image }} style={styles.avatar} />
      <View>
        <SCText style={{ color: colors.text, paddingLeft: 20 }}>
          {user.name}{' '}
          {user.id === chatClient.user.id ? (
            <SCText style={styles.currentUserSubtext}>
              (current logged in user)
            </SCText>
          ) : (
            ''
          )}
        </SCText>
        <SCText
          style={[
            styles.userId,
            {
              color: colors.linkText,
            },
          ]}>
          @{user.id}
        </SCText>
      </View>
    </TouchableOpacity>
  );
};
