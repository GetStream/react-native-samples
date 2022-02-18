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
import {  MainScreenProps } from "../../../types";
import ThumbNailComponent from "../../components/thumbnail";
import useStreamChannel from "../../hooks/channelHook";
import { LiveStreamChannel } from "../../models/channel";





function FollowingScreen({ navigation }: MainScreenProps) {
  const { channels } = useStreamChannel();
  const renderItem = ({ item }: { item: LiveStreamChannel }) => (
    <Pressable
      onPress={() => navigation.navigate("Live", { url: item.channelStream })}
    >
      <ThumbNailComponent
        uri={item.channelImg}
        streamerName={item.channelName}
        streamName={item.channelName}
      />
    </Pressable>
  );

  return (
    <SafeAreaView>
      <FlatList
        data={channels}
        renderItem={renderItem}
        keyExtractor={(item) => item.channelImg}
      />
    </SafeAreaView>
  );
}

export default FollowingScreen;
