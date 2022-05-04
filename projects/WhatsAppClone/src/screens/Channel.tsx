import React, {useContext} from 'react'
import {MessageList} from 'stream-chat-react-native'
import {AppContext} from '../App'
import MessageInput from '../components/channel/MessageInput'
import ChannelHeader from '../components/channel/ChannelHeader'
import ChannelBackgroundWrapper from '../utils/ChannelBackgroundWrapper'
import {colors} from '../theme'

export default () => {
  const {
    // @ts-ignore
    channel: {id: channelId},
  } = useContext(AppContext)
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
