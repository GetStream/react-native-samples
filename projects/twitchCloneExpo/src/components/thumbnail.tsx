import React, { useState, useEffect } from "react";
import { Image, View, Dimensions, StyleSheet, Text } from "react-native";
import * as VideoThumbnails from "expo-video-thumbnails";

export default function ThumbNailComponent({
  uri,
  streamName,
  streamerName,
}: {
  uri: string;
  streamName: string;
  streamerName: string;
}) {
  return (
    <View style={styles.boxContainer}>
      <View>
        <Image source={{ uri: uri }} style={styles.image} />
      </View>
      <View>
        <Text style={{ paddingHorizontal: 20, paddingVertical: 4 }}>
          {streamName}
        </Text>
        <Text style={{ paddingHorizontal: 20, paddingVertical: 4 }}>
          {streamerName + " stream"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boxContainer: {
    flexDirection: "row",
    height: Dimensions.get("window").height / 15,
    width: Dimensions.get("window").width,
    flex: 3,
    justifyContent: "flex-start",
    paddingVertical: 4,
    paddingLeft: 20,
    marginVertical:15
  },
  image: {
    resizeMode: "cover",
    flex: 1,
    alignSelf: "center",
    width: Dimensions.get("window").width / 4,
    // height: 150,
    borderRadius: 5,
  },
});
