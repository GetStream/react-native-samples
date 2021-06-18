import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {
  useTheme,
  isDayOrMoment,
  useTranslationContext,
} from 'stream-chat-react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    height: 16,
    justifyContent: 'center',
    marginVertical: 4,
    paddingHorizontal: 8,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

type InlineDateSeparatorProps = {
  date?: Date;
};

export const InlineDateSeparator: React.FC<InlineDateSeparatorProps> = ({
  date,
}) => {
  const {
    theme: {
      colors: {grey},
      inlineDateSeparator: {container, text},
    },
  } = useTheme();
  const {tDateTimeParser} = useTranslationContext();

  if (!date) {
    return null;
  }

  const dateFormat =
    date.getFullYear() === new Date().getFullYear()
      ? 'ddd, MMM D HH:mm'
      : 'MMM D YYYY HH:mm';
  const tDate = tDateTimeParser(date);
  const dateString = isDayOrMoment(tDate)
    ? tDate.format(dateFormat)
    : new Date(tDate).toDateString();

  return (
    <View style={[styles.container, container]}>
      <Text style={[styles.text, {color: grey}, text]}>{dateString}</Text>
    </View>
  );
};
