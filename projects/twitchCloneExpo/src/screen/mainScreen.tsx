import * as React from "react";
import { View, Text, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FollowingScreen from "./main_screens/following";
import DiscoverScreen from "./main_screens/discover";
import BrowseScreen from "./main_screens/browse";
import SearchScreen from "./main_screens/search";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function MainScreen() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let IconName: keyof typeof Ionicons.glyphMap = "heart";
            if (route.name === "Following") {
              IconName = focused ? "heart" : "heart-outline";
            } else if (route.name === "Discover") {
              IconName = focused ? "ios-compass" : "ios-compass-outline";
            } else if (route.name === "Browse") {
              IconName = focused ? "md-copy" : "md-copy-outline";
            } else if (route.name === "Search") {
              IconName = focused ? "search" : "search";
            }
            return <Ionicons name={IconName} color={color} size={size} />;
          },
          tabBarActiveTintColor: "purple",
          tabBarInactiveTintColor: "black",
          headerShown: false,
        })}
      >
        <Tab.Screen name="Following" component={FollowingScreen} />
        <Tab.Screen name="Discover" component={DiscoverScreen} />
        <Tab.Screen name="Browse" component={BrowseScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
      </Tab.Navigator>
    // </NavigationContainer>
  );
}

export default MainScreen;
