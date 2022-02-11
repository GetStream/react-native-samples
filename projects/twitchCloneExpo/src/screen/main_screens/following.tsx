import * as React from "react";
import { View, Text, TouchableOpacity, Pressable, FlatList, ScrollView } from "react-native";
import VideoComponent from "../../components/videoComponent";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types";
import ThumbNailComponent from "../../components/thumbnail";

type MainScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
  >;

  type Props = {
    navigation: MainScreenNavigationProp;
  };

function FollowingScreen({ navigation }: Props) {
  return (
    <View style={{ flex: 1, justifyContent: "flex-start" }}>
      <ScrollView>
        <Pressable onPress={() => navigation.navigate("Live")}>
          <ThumbNailComponent uri="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
        </Pressable>

        <Pressable onPress={() => navigation.navigate("Live")}>
          <ThumbNailComponent uri="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" />
        </Pressable>

        {/* <Pressable onPress={() => navigation.navigate("Live")}>
          <BoxContainer url="https://upload.wikimedia.org/wikipedia/commons/transcoded/a/a2/Elephants_Dream_%282006%29.webm/Elephants_Dream_%282006%29.webm.480p.vp9.webm" />
        </Pressable> */}
      </ScrollView>
    </View>
  );
}

export default FollowingScreen;


// https://youtu.be/eFQxRd0isAQ
// 