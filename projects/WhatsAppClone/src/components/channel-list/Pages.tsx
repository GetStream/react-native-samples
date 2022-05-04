import React, {useMemo} from 'react'
import {ChannelList, Chat} from 'stream-chat-react-native'
import {ChannelSort} from 'stream-chat'
import {chatClient} from '../../client'
import ChannelPreview from './ChannelPreview'
import {View} from 'react-native'
import {colors} from '../../theme'

const filters = {
  members: {$in: ['steve']},
  type: 'messaging',
}
const sort: ChannelSort = {last_message_at: -1}

export const ChatsPage = () => {
  const memoizedFilters = useMemo(() => filters, [])

  return (
    <Chat client={chatClient}>
      <ChannelList
        Preview={ChannelPreview}
        filters={memoizedFilters}
        sort={sort}
      />
    </Chat>
  )
}

export const CameraPage = () => (
  <View style={{flex: 1, backgroundColor: colors.dark.background}} />
)
export const StatusPage = () => (
  <View style={{flex: 1, backgroundColor: colors.dark.background}} />
)

export const CallsPage = () => (
  <View style={{flex: 1, backgroundColor: colors.dark.background}} />
)
