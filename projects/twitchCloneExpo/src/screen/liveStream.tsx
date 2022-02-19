import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
} from "react-native";
import { StreamChat } from "stream-chat";
import VideoComponent from "../components/videoComponent";
import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  OverlayProvider as ChatOverlayProvider,
  KeyboardCompatibleView,
  MessageContent,
  useMessageContext,
  MessageFooter,
  RootSvg,
  RootPath,
  useMessageInputContext,
} from "stream-chat-expo";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LiveScreenProps } from "../../types";

const chatClient = StreamChat.getInstance("62mwbdkdfv8j");
const userToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoib2tlY2h1a3d1In0.7SNsBLTxoBlGX7KfXvP-dDAZ7pGJF-sO-NPZwXkYk4o";
const getRandomColor = (): string => {
  let textColor = ["red", "blue", "yellow"];
  var item = textColor[Math.floor(Math.random() * textColor.length)];
  return item;
};

const user = {
  id: "okechukwu",
  username: "enigma",
  color: getRandomColor(),
};

const connectUserPromise = chatClient.connectUser(user, userToken);

const channel = chatClient.channel("messaging", "channel_id");

const SendButton = () => {
  const { sendMessage, text, imageUploads, fileUploads } =
    useMessageInputContext();
  const isDisabled = !text && !imageUploads.length && !fileUploads.length;

  return (
    <TouchableOpacity disabled={isDisabled} onPress={sendMessage}>
      <Ionicons
        name={"ios-send-outline"}
        color={isDisabled ? "grey" : "blue"}
        size={21}
      />
    </TouchableOpacity>
  );
};

const SimpleChatText = () => {
  const { message } = useMessageContext();
  const displayName = message.user?.username ?? message.user?.id;
  const colour: string = message.user?.color as string;
  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={{ color: colour }}>{displayName}: </Text>
      <Text>{message.text}</Text>
    </View>
  );
};

function LiveScreen({ route, navigation }: LiveScreenProps) {
  const { url } = route.params;
  const { bottom } = useSafeAreaInsets();
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const iosVerticalOffset = bottom > 0 ? 0 : 0;

  useEffect(() => {
    const initChat = async () => {
      await connectUserPromise;
      await channel.watch();
      setReady(true);
    };

    initChat().catch((error) => {
      setError("Error Loading Stream");
    });
  }, []);

  if (error.length > 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{error}</Text>
      </View>
    );
  }
  if (!ready) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>loading...</Text>
      </View>
    );
  }

  return (
    <ChatOverlayProvider bottomInset={bottom} topInset={0}>
      <SafeAreaProvider>
        <View style={StyleSheet.absoluteFill}>
          <View style={{ flex: 2.2 }}>
            <VideoComponent url={url} />
          </View>
          <KeyboardCompatibleView
            style={{ flex: 4 }}
            keyboardVerticalOffset={
              Platform.OS === "android" ? undefined : iosVerticalOffset
            }
          >
            <Chat client={chatClient}>
              <Channel
                channel={channel}
                keyboardVerticalOffset={0}
                MessageSimple={SimpleChatText}
                hasImagePicker={false}
                hasCommands={false}
                hasFilePicker={false}
                hideStickyDateHeader={true}
                hideDateSeparators={true}
                SendButton={SendButton}
              >
                <MessageList />
                <MessageInput giphyActive={false} />
                <View style={{ paddingBottom: 16 }} />
              </Channel>
            </Chat>
          </KeyboardCompatibleView>
        </View>
      </SafeAreaProvider>
    </ChatOverlayProvider>
  );
}

export default LiveScreen;
