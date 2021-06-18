import React from 'react';
import {TouchableOpacity} from 'react-native';
import {
  SendButtonProps,
  useMessageInputContext,
  useTheme,
  SendUp,
} from 'stream-chat-react-native';

/**
 * UI Component for send button in MessageInput component.
 */
export const SendButton = (props: SendButtonProps) => {
  const {sendMessage} = useMessageInputContext();

  const {disabled = false} = props;

  const {
    theme: {
      colors: {ios_green},
      messageInput: {sendButton},
    },
  } = useTheme();

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={sendMessage}
      style={[sendButton]}
      testID="send-button">
      <SendUp pathFill={ios_green} />
    </TouchableOpacity>
  );
};
