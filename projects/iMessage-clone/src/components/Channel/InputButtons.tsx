import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme, useMessageInputContext} from 'stream-chat-react-native';

import {Camera} from '../../icons';

const styles = StyleSheet.create({
  attachButtonContainer: {paddingHorizontal: 5},
});

export const InputButtons = () => {
  const {
    giphyActive,
    hasCommands,
    hasFilePicker,
    hasImagePicker,
    toggleAttachmentPicker,
    uploadsEnabled,
  } = useMessageInputContext();

  const {
    theme: {
      colors: {grey},
      messageInput: {attachButtonContainer},
    },
  } = useTheme();
  if (giphyActive) {
    return null;
  }

  return (
    <>
      {(hasImagePicker || hasFilePicker) && uploadsEnabled !== false && (
        <View
          style={[
            hasCommands ? styles.attachButtonContainer : undefined,
            attachButtonContainer,
          ]}>
          <TouchableOpacity onPress={toggleAttachmentPicker}>
            <Camera width={21} pathFill={grey} />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};
