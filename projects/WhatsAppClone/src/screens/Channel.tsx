import React from 'react'
import {MessageList} from 'stream-chat-react-native'
import {useAppContext} from '../App'
import MessageInput from '../components/channel/MessageInput'
import ChannelBackgroundWrapper from '../utils/ChannelBackgroundWrapper'
import {colors} from '../theme'
import {ActivityIndicator, View} from 'react-native'
import {flex} from '../global'

export const ChannelScreen = () => {
  const {channel} = useAppContext()
  if (!channel) return null

  if (!channel?.initialized || !channel?.id)
    return (
      <View
        style={{
          ...flex.itemsContentCenter1,
          backgroundColor: colors.dark.background,
        }}>
        <ActivityIndicator size={'large'} />
      </View>
    )

  return (
    <ChannelBackgroundWrapper
      channelId={channel?.id}
      style={{backgroundColor: colors.dark.background, flex: 1}}>
      <MessageList />
      <MessageInput />
    </ChannelBackgroundWrapper>
  )
}
