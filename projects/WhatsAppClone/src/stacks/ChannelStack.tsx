import React, {useContext, useEffect} from 'react'
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack'
import {Chat} from 'stream-chat-react-native'
import {AppContext, noHeaderOptions} from '../App'
import {chatClient} from '../client'
import {RouteProp} from '@react-navigation/native'
import {StackNavigatorParamList} from '../types'
import Channel from '../screens/Channel'
import CustomWallpaper from '../screens/CustomWallpaper'
import WallpaperTypesOverview from '../screens/WallpaperTypesOverview'
import WhatsAppChannelWrapper from '../utils/WhatsAppChannelWrapper'
import ImagePreview from '../screens/ImagePreview'
import WallpaperTypeDetails from '../screens/WallpaperTypeDetails'
import ChannelHeader from '../components/channel/ChannelHeader'

export type ChannelScreenNavigationProp = StackNavigationProp<
  StackNavigatorParamList,
  'ChannelScreen'
>
export type ChannelScreenRouteProp = RouteProp<
  StackNavigatorParamList,
  'ChannelScreen'
>
export type ChannelScreenProps = {
  navigation: ChannelScreenNavigationProp
  route: ChannelScreenRouteProp
}

const Stack = createStackNavigator()

export default ({
  route: {
    params: {channelId},
  },
}: ChannelScreenProps) => {
  const {channel, setChannel} = useContext(AppContext)

  useEffect(() => {
    const initChannel = async () => {
      if (!chatClient || !channelId) return

      const newChannel = chatClient?.channel('messaging', channelId)

      if (!newChannel?.initialized) {
        await newChannel?.watch()
      }
      setChannel(newChannel)
    }

    initChannel()
  }, [channelId, setChannel])

  return (
    <Chat client={chatClient}>
      <WhatsAppChannelWrapper channel={channel}>
        <Stack.Navigator
          initialRouteName="Channel"
          screenOptions={{
            headerTitleStyle: {alignSelf: 'center', fontWeight: 'bold'},
          }}>
          <Stack.Screen
            component={Channel}
            name="Channel"
            options={{
              header: ChannelHeader,
            }}
          />
          <Stack.Screen
            component={ImagePreview}
            name="ImagePreview"
            options={noHeaderOptions}
          />
          <Stack.Screen
            component={CustomWallpaper}
            name="CustomWallpaper"
            options={noHeaderOptions}
          />
          <Stack.Screen
            component={WallpaperTypesOverview}
            name="WallpaperTypesOverview"
            options={noHeaderOptions}
          />
          <Stack.Screen
            component={WallpaperTypeDetails}
            name="WallpaperTypeDetails"
            options={noHeaderOptions}
          />
        </Stack.Navigator>
      </WhatsAppChannelWrapper>
    </Chat>
  )
}
