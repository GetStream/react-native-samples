import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { StreamChat } from "stream-chat";
import VideoComponent from "../components/videoComponent";
import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  OverlayProvider as ChatOverlayProvider,
} from "stream-chat-expo";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const chatClient = StreamChat.getInstance("62mwbdkdfv8j");
const userToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoib2tlY2h1a3d1In0.7SNsBLTxoBlGX7KfXvP-dDAZ7pGJF-sO-NPZwXkYk4o";

const user = {
  id: "okechukwu",
};

const connectUserPromise = chatClient.connectUser(user, userToken);

const channel = chatClient.channel("messaging", "channel_id");

function LiveScreen() {
  const { bottom } = useSafeAreaInsets();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const initChat = async () => {
      await connectUserPromise;
      await channel.watch();
      setReady(true);
    };

    initChat();
  }, []);

  if (!ready) {
    return (
      <View>
        <Text>Failed to load</Text>;
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <View style={StyleSheet.absoluteFill}>
        <View style={{ flex: 2 }}>
          <VideoComponent url="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
        </View>
        <View style={{ flex: 4 }}>
          <ChatOverlayProvider bottomInset={bottom} topInset={0}>
            <SafeAreaView>
              <Chat client={chatClient}>
                <Channel channel={channel} keyboardVerticalOffset={0}>
                  <MessageList />
                  <MessageInput />
                </Channel>
              </Chat>
            </SafeAreaView>
          </ChatOverlayProvider>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

export default LiveScreen;
