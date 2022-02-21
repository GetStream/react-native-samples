import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
} from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StreamChat, Channel as ChannelType } from "stream-chat";
import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  OverlayProvider as ChatOverlayProvider,
  KeyboardCompatibleView,
  useMessageContext,
  useMessageInputContext,
  DefaultChannelType,
} from "stream-chat-expo";
import { Ionicons } from "@expo/vector-icons";

import { LiveScreenProps } from "../../types";
import VideoComponent from "../components/videoComponent";

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
  const userNameColor = message.user?.color as string;
  return (
    <View style={styles.messageContainer}>
      <Text style={[styles.messageUserName, { color: userNameColor }]}>{displayName}: </Text>
      <Text style={styles.messageText}>{message.text}</Text>
    </View>
  );
};

function LiveScreen({ route }: LiveScreenProps) {
  const { url, ID: liveStreamID } = route.params;
  const { bottom } = useSafeAreaInsets();
  const [ready, setReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [channel, setChannel] = useState<ChannelType | null>(null);
  const iosVerticalOffset = 0;

  useEffect(() => {
    const initChat = async () => {
      try {
        if (!chatClient.userID) {
            await connectUserPromise;
        }
        // TODO: Dynamically select channel
        const newChannel = chatClient.channel("livestream", liveStreamID);
        await newChannel.watch();

        setChannel(newChannel as ChannelType);
        setReady(true);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setErrorMessage(`Error Loading Stream: ${error.message}`);
        }
      }
    };

      initChat();
  }, []);

  if (errorMessage) {
    return (
      <View style={styles.statusMessageContainer}>
        <Text>{errorMessage}</Text>
      </View>
    );
  }

  if (!ready) {
    return (
      <View style={styles.statusMessageContainer}>
        <Text>loading...</Text>
      </View>
    );
  }

  return (
    <ChatOverlayProvider bottomInset={bottom} topInset={0}>
      <SafeAreaProvider>
        <View style={StyleSheet.absoluteFill}>
          <View style={styles.videoContainer}>
            <VideoComponent url={url} />
          </View>
          <KeyboardCompatibleView
            style={styles.chatContainer}
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
                <View style={styles.bottomSpaces} />
              </Channel>
            </Chat>
          </KeyboardCompatibleView>
        </View>
      </SafeAreaProvider>
    </ChatOverlayProvider>
  );
}

const styles = StyleSheet.create({
  videoContainer: {
    flex: 2.2,
  },
  chatContainer: {
    flex: 4,
  },
  bottomSpaces: {
    paddingBottom: 18,
  },
  statusMessageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  messageContainer: {
    flexDirection: "row"
  },
  messageUserName: {

  },
  messageText: {

  }

});

export default LiveScreen;
