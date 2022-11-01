import ChannelList from '../screens/ChannelList'
import ChannelScreen from './ChannelStack'
import React from 'react'
import {noHeaderOptions} from '../App'
import {createStackNavigator} from '@react-navigation/stack'

const Stack = createStackNavigator()

export enum ROOT_STACK {
  CHANNEL_LIST = 'RootStackChannelList',
  CHANNEL_SCREEN = 'RootStackChannelScreen',
}

export default ({clientReady}: {clientReady: boolean}) => {
  if (!clientReady) return null

  return (
    <Stack.Navigator
      initialRouteName={ROOT_STACK.CHANNEL_LIST}
      screenOptions={{
        headerTitleStyle: {alignSelf: 'center', fontWeight: 'bold'},
      }}>
      <Stack.Screen
        component={ChannelList}
        name={ROOT_STACK.CHANNEL_LIST}
        options={noHeaderOptions}
      />
      <Stack.Screen
        component={ChannelScreen}
        name={ROOT_STACK.CHANNEL_SCREEN}
        options={noHeaderOptions}
      />
    </Stack.Navigator>
  )
}
