import Reac, { useRef, useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";

const VideoComponent = ({ url }: { url: string }) => {
  return (
    <Video
      isMuted={true}
      shouldPlay={true}
      // ref={video}
      style={styles.video}
      source={{
        uri: url,
      }}
      useNativeControls
      resizeMode="cover"
      isLooping
      // onPlaybackStatusUpdate={(status) => setStatus(() => status)}
    />
  );
};

const styles = StyleSheet.create({
  video: {
    backgroundColor: "black",
    flex: 1,
    alignSelf: "auto",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 4,
  },
});

export default VideoComponent;
