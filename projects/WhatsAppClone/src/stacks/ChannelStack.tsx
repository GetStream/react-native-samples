import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {noHeaderOptions, useAppContext} from '../App'
import {ChannelScreen} from '../screens/Channel'
import CustomWallpaper from '../screens/CustomWallpaper'
import WallpaperTypesOverview from '../screens/WallpaperTypesOverview'
import WhatsAppChannelWrapper from '../utils/WhatsAppChannelWrapper'
import ImagePreview from '../screens/ImagePreview'
import WallpaperTypeDetails from '../screens/WallpaperTypeDetails'
import ChannelHeader from '../components/channel/ChannelHeader'

const Stack = createStackNavigator()

export enum CHANNEL_STACK {
  CHANNEL_SCREEN = 'ChannelStackChannelScreen',
  IMAGE_PREVIEW = 'ChannelStackImagePreview',
  CUSTOM_WALLPAPER = 'ChannelStackCustomWallpaper',
  WALLPAPER_TYPES_OVERVIEW = 'ChannelStackWallpaperTypesOverview',
  WALLPAPER_TYPE_DETAILS = 'ChannelStackWallpaperTypeDetails',
}

export default () => {
  const {channel} = useAppContext()

  return (
    <WhatsAppChannelWrapper channel={channel}>
      <Stack.Navigator
        initialRouteName={CHANNEL_STACK.CHANNEL_SCREEN}
        screenOptions={{
          headerTitleStyle: {alignSelf: 'center', fontWeight: 'bold'},
        }}>
        <Stack.Screen
          component={ChannelScreen}
          name={CHANNEL_STACK.CHANNEL_SCREEN}
          options={{
            header: ChannelHeader,
          }}
        />
        <Stack.Screen
          component={ImagePreview}
          name={CHANNEL_STACK.IMAGE_PREVIEW}
          options={noHeaderOptions}
        />
        <Stack.Screen
          component={CustomWallpaper}
          name={CHANNEL_STACK.CUSTOM_WALLPAPER}
          options={noHeaderOptions}
        />
        <Stack.Screen
          component={WallpaperTypesOverview}
          name={CHANNEL_STACK.WALLPAPER_TYPES_OVERVIEW}
          options={noHeaderOptions}
        />
        <Stack.Screen
          component={WallpaperTypeDetails}
          name={CHANNEL_STACK.WALLPAPER_TYPE_DETAILS}
          options={noHeaderOptions}
        />
      </Stack.Navigator>
    </WhatsAppChannelWrapper>
  )
}
