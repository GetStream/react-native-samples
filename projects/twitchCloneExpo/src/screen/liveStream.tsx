import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import VideoComponent from "../components/videoComponent";
import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  OverlayProvider as ChatOverlayProvider,
} from "stream-chat-expo";
function LiveScreen() {
  return (
    <View style={StyleSheet.absoluteFill}>
      <VideoComponent url="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
      <MessageList />
      <MessageInput />
    </View>
  );
}

export default LiveScreen;
