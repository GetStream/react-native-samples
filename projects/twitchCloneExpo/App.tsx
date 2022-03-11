import { Pressable, View, Image, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainScreen from "./src/screen/mainScreen";
import LiveScreen from "./src/screen/liveStream";
import SearchScreen from "./src/screen/main_screens/search";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={MainScreen}
          options={{
            title: "",
            headerLeft: () => (
              <Image
                source={{
                  uri: "https://avatars.githubusercontent.com/u/24194413?s=96&v=4",
                }}
                style={styles.avatar}
              />
            ),
            headerRight: () => (
              <View style={{ flexDirection: "row" }}>
                <Pressable
                  onPress={() => {}}
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.5 : 1,
                  })}
                >
                  <AntDesign
                    name="videocamera"
                    size={25}
                    color="black"
                    style={{ marginRight: 15 }}
                  />
                </Pressable>

                <Pressable
                  onPress={() => {}}
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.5 : 1,
                  })}
                >
                  <AntDesign
                    name="inbox"
                    size={25}
                    color="black"
                    style={{ marginRight: 15 }}
                  />
                </Pressable>

                <Pressable
                  onPress={() => {}}
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.5 : 1,
                  })}
                >
                  <AntDesign
                    name="message1"
                    size={25}
                    color="black"
                    style={{ marginRight: 15 }}
                  />
                </Pressable>

                <Pressable
                  onPress={({}) => {
                    // const navigation = useNavigation();
                    // navigation.navigate({ key: "Search" });
                  }}
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.5 : 1,
                  })}
                >
                  <AntDesign
                    name="search1"
                    size={styles.icon.height}
                    color="black"
                    style={styles.icon}
                  />
                </Pressable>
              </View>
            ),
          }}
        />
        <Stack.Screen
          
          name="Live"
          component={LiveScreen}
          options={{ headerShown: true ,headerTintColor:"black", title:"",}}
          initialParams={{ url: "" ,}}
        />
        <Stack.Screen name="Search" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 15,
    height: 25,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 200 / 2
  }
})
