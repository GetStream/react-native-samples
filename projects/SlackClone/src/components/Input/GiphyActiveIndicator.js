import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Lightning, useMessageInputContext } from 'stream-chat-react-native';

import { SCText } from '../SCText';

const styles = StyleSheet.create({
  giphyContainer: {
    alignItems: 'center',
    borderRadius: 12,
    flexDirection: 'row',
    height: 24,
    marginRight: 8,
    paddingHorizontal: 2,
    width: 60,
  },
  giphyText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export const GiphyActiveIndicator = () => {
  const { colors } = useTheme();
  const { giphyActive } = useMessageInputContext();

  if (!giphyActive) {
    return null;
  }

  return (
    <View
      style={[
        styles.giphyContainer,
        { backgroundColor: colors.backgroundSecondary },
      ]}>
      <Lightning height={16} pathFill={colors.white} width={16} />
      <SCText style={[styles.giphyText, { color: colors.white }]}>GIPHY</SCText>
    </View>
  );
};
