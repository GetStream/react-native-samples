import ChannelList from '../screens/ChannelList'
import ChannelStack from './ChannelStack'
import React from 'react'
import {noHeaderOptions} from '../App'
import {createStackNavigator} from '@react-navigation/stack'
import WallpaperTypeDetails from '../screens/WallpaperTypeDetails'

const Stack = createStackNavigator()

export default ({clientReady}: {clientReady: boolean}) => {
  if (!clientReady) return null

  return (
    <Stack.Navigator
      initialRouteName="ChannelList"
      screenOptions={{
        headerTitleStyle: {alignSelf: 'center', fontWeight: 'bold'},
      }}>
      <Stack.Screen
        component={ChannelList}
        name="ChannelList"
        options={noHeaderOptions}
      />
      <Stack.Screen
        component={ChannelStack}
        name="Channel"
        options={noHeaderOptions}
      />
    </Stack.Navigator>
  )
}
