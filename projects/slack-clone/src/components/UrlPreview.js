import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { goToURL } from 'stream-chat-react-native';

import { truncate } from '../utils';
import { SCText } from './SCText';

export const UrlPreview = React.memo((props) => {
  const getDomain = (url) => {
    const domain = url && url.replace('https://', '').replace('http://', '');

    if (!domain) {
      return url;
    }
    const indexOfSlash = domain.indexOf('/');
    if (indexOfSlash === -1) {
      return domain;
    }

    return domain.slice(0, indexOfSlash);
  };
  return (
    <TouchableOpacity
      onPress={() => goToURL(props.title_link)}
      style={styles.container}>
      <View style={styles.detailsContainer}>
        <SCText style={styles.titleUrl}>{getDomain(props.title_link)}</SCText>
        <SCText style={styles.title}>{props.title}</SCText>
        <SCText style={styles.description}>{truncate(props.text, 100)}</SCText>
      </View>
      <View style={styles.thumbnailContainer}>
        <Image
          resizeMode='cover'
          source={{
            url: props.image_url || props.thumb_url,
          }}
          style={styles.thumbnail}
        />
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    borderLeftColor: '#E4E4E4',
    borderLeftWidth: 5,
    flexDirection: 'column',
    marginTop: 10,
    paddingLeft: 10,
  },
  description: {
    padding: 2,
  },
  detailsContainer: {
    flexDirection: 'column',
  },
  thumbnail: {
    height: 150,
    width: '100%',
  },
  thumbnailContainer: {},
  title: {
    color: '#1E75BE',
    fontWeight: 'bold',
    padding: 2,
  },
  titleUrl: {
    fontWeight: 'bold',
    padding: 2,
  },
});
