import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from 'stream-chat-react-native';

import { MessageUserBar } from './MessageHeader';
import { SCText } from './SCText';

export const MessageText = React.memo((props) => {
  const { isThreadMessage, message, renderText } = props;

  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <>
      {message.attachments.length === 0 && <MessageUserBar {...props} />}
      {message.show_in_channel && !isThreadMessage && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ThreadScreen', {
              channelId: message.cid.substring(message.cid.indexOf(':') + 1),
              threadId: message.parent_id,
            });
          }}
          style={{
            backgroundColor: 'transparent',
            marginBottom: 10,
          }}>
          <SCText
            style={{
              color: colors.dimmedText,
            }}>
            replied to a thread{' '}
            {/* <SCText
              style={{
                color: colors.linkText,
              }}>
              {message.parentMessageText
                ? truncate(message.parentMessageText, 70, '...')
                : ''}
            </SCText> */}
          </SCText>
        </TouchableOpacity>
      )}
      {renderText({
        colors: Colors,
        markdownStyles: {
          inlineCode: {
            color: 'red',
            fontWeight: '200',
          },

          mentions: {
            fontWeight: '700',
          },
          // unfortunately marginVertical doesn't override the defaults for these within the 3rd party lib
          paragraph: {
            marginBottom: 0,
            marginTop: 0,
          },

          paragraphCenter: {
            marginBottom: 0,
            marginTop: 0,
          },
          paragraphWithImage: {
            marginBottom: 0,
            marginTop: 0,
          },
          text: {
            color: colors.text,
            fontFamily: 'Lato-Regular',
            fontSize: 16,
          },
        },
        message,
      })}
    </>
  );
});
