import Reac, { useRef, useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";

const VideoComponent = ({ url }: { url: string }) => {
  const video = useRef(null);
  //  const [status, setStatus] = useState({});
  return (
    <View style={{ ...styles.boxContainer }}>
      <Video
        
        isMuted={true}
        // shouldPlay={false}
        ref={video}
        style={styles.video}
        source={{
          uri: url,
        }}
        useNativeControls
        resizeMode="cover"
        isLooping
        // onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    height: Dimensions.get("window").width / 2,
    position: "absolute",
    top: 5,
  },
  video: {
    flex: 1,
    alignSelf: "auto",
    width: Dimensions.get("window").width,
  },
});

export default VideoComponent;
