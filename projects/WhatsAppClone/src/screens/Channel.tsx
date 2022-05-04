import React, {useContext} from 'react'
import {MessageList} from 'stream-chat-react-native'
import {AppContext} from '../App'
import MessageInput from '../components/channel/MessageInput'
import ChannelHeader from '../components/channel/ChannelHeader'
import ChannelBackgroundWrapper from '../utils/ChannelBackgroundWrapper'
import {colors} from '../theme'
import {ActivityIndicator, View} from 'react-native'
import {flex} from '../global'

export default () => {
  const {
    // @ts-ignore
    channel: {id: channelId, initialized},
  } = useContext(AppContext)

  if (!initialized)
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
      channelId={channelId}
      style={{backgroundColor: colors.dark.background, flex: 1}}>
      <ChannelHeader />
      <MessageList />
      <MessageInput />
    </ChannelBackgroundWrapper>
  )
}
