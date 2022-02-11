import React, { useState, useEffect } from "react";
import { Image, View, Dimensions, StyleSheet, Text } from "react-native";
import * as VideoThumbnails from "expo-video-thumbnails";

export default function ThumbNailComponent({ uri }: { uri: string }) {
  const [image, setImage] = useState(
    "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  );

  useEffect(() => {
    VideoThumbnails.getThumbnailAsync(uri, {
      time: 15000,
    })
      .then(({ uri }) => {
        setImage(uri);
      })
      .catch((e) => console.warn(e));
  }, [uri]);

  return (
    <View style={styles.boxContainer}>
      <View>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
      <View>
        <Text style={{ paddingHorizontal: 20, paddingVertical: 4 }}>User</Text>
        <Text style={{ paddingHorizontal: 20, paddingVertical: 4 }}>Stream</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boxContainer: {
    flexDirection: "row",
    height: Dimensions.get("window").width / 3,
    width: Dimensions.get("window").width,
    flex: 3,
    justifyContent: "flex-start",
    paddingVertical: 4,
    paddingLeft: 20,

  },
  image: {
    flex: 1,
    alignSelf: "center",
    width: Dimensions.get("window").width / 4,
    height: 150,
    borderRadius: 20,
  },
});
