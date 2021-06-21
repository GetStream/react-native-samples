import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { ListItemSeparator } from '../ListItemSeparator';
import { SCText } from '../SCText';

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 10,
    padding: 15,
  },
});

export const ActionItem = React.memo(
  ({ addSeparator, handler, Icon, id, title }) => {
    const { colors } = useTheme();
    return (
      <>
        {addSeparator && <ListItemSeparator />}
        <TouchableOpacity
          key={title}
          onPress={handler}
          style={styles.container}>
          <Icon />
          <SCText
            style={{
              color: id === 'delete' ? 'red' : colors.text,
              marginLeft: 20,
            }}>
            {title}
          </SCText>
        </TouchableOpacity>
      </>
    );
  },
);
