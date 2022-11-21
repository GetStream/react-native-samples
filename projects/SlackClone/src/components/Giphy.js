import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { makeImageCompatibleUrl } from 'stream-chat-react-native';

import { SCText } from './SCText';

const styles = StyleSheet.create({
  container: {
    borderLeftColor: '#E4E4E4',
    borderLeftWidth: 5,
    flexDirection: 'column',
    marginBottom: 10,
    marginLeft: 10,
    paddingLeft: 10,
  },
  description: {
    fontSize: 13,
    fontWeight: '300',
    padding: 2,
  },
  thumbnail: {
    borderRadius: 10,
    height: 150,
    width: 250,
  },
  title: {
    color: '#1E75BE',
    fontWeight: 'bold',
    padding: 2,
  },
});

export const Giphy = ({ attachment }) => {
  const { image_url, thumb_url, title } = attachment;

  if (!image_url && !thumb_url) {
    return null;
  }

  return (
    <TouchableOpacity style={styles.container}>
      <SCText style={styles.title}>{title}</SCText>
      <SCText style={styles.description}>Posted using Giphy.com</SCText>
      <Image
        source={{
          url: makeImageCompatibleUrl(image_url || thumb_url),
        }}
        style={styles.thumbnail}
      />
    </TouchableOpacity>
  );
};
