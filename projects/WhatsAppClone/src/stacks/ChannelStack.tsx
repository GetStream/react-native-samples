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

export default () => {
  const {channel} = useAppContext()

  return (
    <WhatsAppChannelWrapper channel={channel}>
      <Stack.Navigator
        initialRouteName="ChannelScreen"
        screenOptions={{
          headerTitleStyle: {alignSelf: 'center', fontWeight: 'bold'},
        }}>
        <Stack.Screen
          component={ChannelScreen}
          name="ChannelScreen"
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
  )
}
