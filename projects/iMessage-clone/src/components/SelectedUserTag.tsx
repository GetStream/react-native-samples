import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useTheme} from 'stream-chat-react-native';

import type {UserResponse} from 'stream-chat';

const styles = StyleSheet.create({
  tagContainer: {
    borderRadius: 3,
    flexDirection: 'row',
  },
  tagText: {
    alignSelf: 'center',
    color: '#53d769',
    fontSize: 14,
    paddingLeft: 7,
    paddingRight: 7,
  },
});

type SelectedUserTagProps = {
  index: number;
  onPress: () => void;
  tag: UserResponse;
  disabled?: boolean;
};

export const SelectedUserTag: React.FC<SelectedUserTagProps> = ({
  disabled = false,
  index,
  onPress,
  tag,
}) => {
  const {
    theme: {
      colors: {grey_whisper},
    },
  } = useTheme();

  return (
    <TouchableOpacity
      disabled={disabled}
      key={`${tag}-${index}`}
      onPress={onPress}
      style={[
        styles.tagContainer,
        {backgroundColor: disabled ? 'transparent' : grey_whisper},
      ]}>
      <Text style={styles.tagText}>{tag.name}</Text>
    </TouchableOpacity>
  );
};
