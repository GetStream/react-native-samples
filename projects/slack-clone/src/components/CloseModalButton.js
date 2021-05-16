import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { SVGIcon } from './SVGIcon';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export const CloseModalButton = ({ goBack }) => (
  <TouchableOpacity onPress={goBack} style={styles.container}>
    <SVGIcon height={15} type={'close-button'} width={15} />
  </TouchableOpacity>
);
