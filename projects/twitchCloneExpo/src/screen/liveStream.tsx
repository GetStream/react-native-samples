import React, {
  useState,
  useEffect,
  memo,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  View,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
  Image,
  SafeAreaView,
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
  renderText,
  Colors,
  AutoCompleteInput,
} from "stream-chat-expo";
import { SingleASTNode, State, ReactOutput } from "simple-markdown";

import { Ionicons } from "@expo/vector-icons";

import { LiveScreenProps } from "../../types";
import VideoComponent from "../components/videoComponent";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { FlatList } from "react-native-gesture-handler";
import { emoticons } from "../utils/supportedReactions";

const chatClient = StreamChat.getInstance("62mwbdkdfv8j");
const userToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoib2tlY2h1a3d1In0.7SNsBLTxoBlGX7KfXvP-dDAZ7pGJF-sO-NPZwXkYk4o";

const getRandomColor = (): string => {
  let textColor = ["red", "blue", "green"];
  var item = textColor[Math.floor(Math.random() * textColor.length)];
  return item;
};

const user = {
  id: "okechukwu",
  username: "enigma",
  color: getRandomColor(),
};

const connectUserPromise = chatClient.connectUser(user, userToken);

// TODO: figure out why this hook doesn't work while trying to set the text of the autocomplete inputfiled
// const messageTextHook = () => {
//   const [messageText, setmessageText] = useState("");

//    const setText = ({text}:{text:string}) => {
//      setmessageText((prevText) => `${prevText} ${text}`);
//    };
  
//   return { messageText, setText };
// }

const SendButton = () => {

  const { sendMessage, text, imageUploads, fileUploads, appendText } =
    useMessageInputContext();
  const snapPoints = useMemo(() => ["50%", "50%"], []);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentPress = () => bottomSheetModalRef?.current?.present();
  const handleClosePress = () => bottomSheetModalRef?.current?.close();

  const isDisabled = !text && !imageUploads.length && !fileUploads.length;

  const data = emoticons;
  // render
  const renderItem = useCallback(
    ({
      item,
    }: {
      item: {
        image: string;
        tag: string;
      };
    }) => (
      <TouchableOpacity
        onPress={() => {

          appendText(`${item.tag} `);

        }}
      >
        <Text>
          {" "}
          <Image
            key={item.tag}
            source={{ uri: item.image }}
            style={{ width: 30, height: 30 }}
          />
        </Text>
      </TouchableOpacity>
    ),
    []
  );

  return (
    <View style={{ flexDirection: "column" }}>
      <View
        style={[
          {
            justifyContent: "center",
            alignItems: "center",
            height: 40,
            flexDirection: "row",
          },

          styles.flex,
        ]}
      >
        <TouchableOpacity disabled={isDisabled} onPress={sendMessage}>
          <Ionicons
            name={"ios-send-outline"}
            color={isDisabled ? "grey" : "blue"}
            size={21}
          />
        </TouchableOpacity>
        <View style={{ width: 5 }} />
        <TouchableOpacity onPress={handlePresentPress}>
          <Ionicons name={"add-outline"} color={"blue"} size={25} />
        </TouchableOpacity>
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
      >
        <SafeAreaView>
          <FlatList
            data={data}
            keyExtractor={(i) => i.tag}
            renderItem={renderItem}
            numColumns={11}
          />
        </SafeAreaView>
      </BottomSheetModal>
    </View>
  );
};

const CustomInput = () => {
  return (
    <View style={[styles.fullWidth, styles.row]}>
      <View style={[styles.input]}>
        <AutoCompleteInput/>
      </View>
      <View style={{ width: 5 }} />
      <SendButton />
    </View>
  );
};

const assetDirectory =
  "/Users/enigma/react_native/react-native-samples/projects/twitchCloneExpo/assets/";

const SimpleChatText = memo((props) => {
  const { message } = useMessageContext();
  const displayName = message.user?.username ?? message.user?.id;
  const userNameColor = message.user?.color as string;
  return (
    <View style={styles.messageContainer}>
      <Text style={[styles.messageUserName, { color: userNameColor }]}>
        {displayName}:{" "}
      </Text>
      {/* <Text style={styles.messageText}>{message.text}</Text> */}
      <>
        {renderText({
          colors: Colors,
          markdownStyles: {
            mentions: {
              fontWeight: "200",
            },
            paragraph: {
              marginBottom: 0,
              marginTop: 0,
            },

            paragraphCenter: {
              marginBottom: 0,
              marginTop: 0,
            },
            paragraphWithImage: {
              marginBottom: 0,
              marginTop: 0,
            },
            text: {
              color: "black",
              fontSize: 14,
            },
          },
          markdownRules: {
            emote: {
              order: 1,
              match: function (source: string) {
                // console.log(source);
                return new RegExp("^.*(KEKW|Kappa|Hello|Fun).*$").exec(source);
              },
              parse: function (
                capture: any[],
                parse: (cap: string, state: any) => any,
                state: any
              ) {
                return {
                  text: capture[0],
                };
              },
              react: (
                node: SingleASTNode,
                output: ReactOutput,
                state: State
              ) => {
                const emotes: Record<string, string> = {
                  Kappa: `${assetDirectory}brobalt.png`,
                  Hello: `${assetDirectory}ariw.png`,
                  Fun: `${assetDirectory}angelthump.png`,
                };

                const segments = node.text.split(" ");
                return segments.map((s: string) => {
                  if (emotes[s]) {
                    return (
                      <Text>
                        {" "}
                        <Image
                          key={state.key}
                          source={{ uri: emotes[s] }}
                          style={{ width: 15, height: 15 }}
                        />
                      </Text>
                    );
                  } else {
                    return <Text> {s}</Text>;
                  }
                });
              },
              html: null,
            },
          },
          message,
        })}
      </>
    </View>
  );
});

function LiveScreen({ route }: LiveScreenProps) {
  const { url, ID: liveStreamID } = route.params;
  const { bottom } = useSafeAreaInsets();
  const [ready, setReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [channel, setChannel] = useState<ChannelType | null>(null);
  const iosVerticalOffset = bottom > 0 ? 75 : 0;

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

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

    // if(!cli)

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
    <ChatOverlayProvider
      bottomInset={bottom}
      topInset={0}
      overlayOpacity={{
        value: 0.0,
      }}
    >
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
            <Chat client={chatClient} style={themeStyle}>
              <Channel
                Input={CustomInput}
                channel={channel!}
                keyboardVerticalOffset={0}
                forceAlignMessages="left"
                MessageSimple={SimpleChatText}
                hasImagePicker={false}
                hasCommands={false}
                hasFilePicker={false}
                hideStickyDateHeader={true}
                hideDateSeparators={true}
                SendButton={SendButton}
                MessageHeader={() => null}
                MessageFooter={() => null}
                onLongPressMessage={() => {}}
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

const themeStyle = {
  messageSimple: {
    content: {
      markdown: {
        heading1: {
          color: "pink",
        },
        inlineCode: {
          fontSize: 10,
        },
      },
    },
  },
};

const styles = StyleSheet.create({
  emoteItemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
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
    alignItems: "center",
  },
  messageContainer: {
    flexDirection: "row",
    padding: 8,
  },
  messageUserName: {},
  messageText: {},

  flex: { flex: 1 },
  fullWidth: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  // inputContainer: {
  //   height: 40,
  // },
  input: {
    // width: "100%",
    height: 40,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 15,
    fontSize: 16,
    flex: 4,
  },
});

export default LiveScreen;
