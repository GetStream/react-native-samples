import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  FlatList,
  ScrollView,
  SafeAreaView,
} from "react-native";
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

  const IMAGE_DATA = [
    "https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/images/SubaruOutbackOnStreetAndDirt.jpg",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg",
  ];

  const videos = [
    "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.jpg",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  ];

function FollowingScreen({ navigation }: Props) {
  const renderItem = ({ item }: { item: string }) => (
    <Pressable onPress={() => navigation.navigate("Live")}>
      <ThumbNailComponent uri={item} />
    </Pressable>
  );
  // return (
  //   <View style={{ flex: 1, justifyContent: "flex-start" }}>
  //     <ScrollView>
  //       <Pressable onPress={() => navigation.navigate("Live")}>
  //         <ThumbNailComponent uri="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
  //       </Pressable>

  //       <Pressable onPress={() => navigation.navigate("Live")}>
  //         <ThumbNailComponent uri="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" />
  //       </Pressable>

  //       {/* <Pressable onPress={() => navigation.navigate("Live")}>
  //         <BoxContainer url="https://upload.wikimedia.org/wikipedia/commons/transcoded/a/a2/Elephants_Dream_%282006%29.webm/Elephants_Dream_%282006%29.webm.480p.vp9.webm" />
  //       </Pressable> */}
  //     </ScrollView>
  //   </View>
  // );

    return (
      <SafeAreaView>
        <FlatList
          data={IMAGE_DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item}
        />
      </SafeAreaView>
    );
}

export default FollowingScreen;


// https://youtu.be/eFQxRd0isAQ
// 