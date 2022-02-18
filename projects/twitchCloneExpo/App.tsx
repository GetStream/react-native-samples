import { Ionicons } from "@expo/vector-icons";
import { Pressable, View,Image } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from './src/screen/mainScreen';
import LiveScreen from './src/screen/liveStream';
import { RootStackParamList } from './types';






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
                style={{ width: 30, height: 30, borderRadius: 200 / 2 }}
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
                  <Ionicons
                    name="ios-notifications-outline"
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
                  <Ionicons
                    name="ios-chatbubble-outline"
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
                  <Ionicons
                    name="ios-link-outline"
                    size={25}
                    color="black"
                    style={{ marginRight: 15 }}
                  />
                </Pressable>
              </View>
            ),
          }}
        />
        <Stack.Screen name="Live" component={LiveScreen} options={{headerShown:false}} initialParams={{url:""}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


