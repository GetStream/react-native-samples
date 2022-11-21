import React, {PropsWithChildren, useEffect} from 'react'
import type {ChannelProps} from 'stream-chat-react-native'
import {
  Channel,
  MessageTouchableHandlerPayload,
  useMessageContext,
} from 'stream-chat-react-native'
import {myMessageTheme} from '../theme'
import RenderNothing from '../components/RenderNothing'
import Reply from '../components/channel/Reply'
import {isEmpty} from 'lodash'
import MessageContent from '../components/channel/MessageContent'
import MessageText from '../components/channel/MessageText'
import VoiceMessageAttachment from '../components/channel/VoiceMessageAttachment'
import {StreamChatGenerics} from '../types'
import {useAppContext} from '../App'

export default ({
  channel,
  ...props
}: PropsWithChildren<ChannelProps<StreamChatGenerics>>) => {
  const {setSelectedMessageIdsEditing} = useAppContext()

  const handleToggleMessageSelection = ({
    message,
  }: MessageTouchableHandlerPayload<StreamChatGenerics>) => {
    const messageId = message?.id

    setSelectedMessageIdsEditing(ids => {
      const existsInSelectedChannels = ids.includes(messageId)

      return existsInSelectedChannels
        ? ids.filter(id => id !== messageId)
        : [...ids, messageId]
    })
  }

  useEffect(() => {
    setSelectedMessageIdsEditing([])
  }, [channel?.id, setSelectedMessageIdsEditing])

  useEffect(() => {
    return () => setSelectedMessageIdsEditing([])
  }, [])

  if (!channel) return <RenderNothing />

  return (
    <Channel
      Card={VoiceMessageAttachment}
      MessageAvatar={RenderNothing}
      ReactionList={RenderNothing}
      channel={channel}
      MessageReplies={RenderNothing}
      MessageText={MessageText}
      keyboardVerticalOffset={0}
      Reply={() => {
        const {
          message: {quoted_message: quotedMessage},
        } = useMessageContext()
        return (
          <Reply
            isEnabled={!isEmpty(quotedMessage)}
            isPreview={false}
            message={quotedMessage}
          />
        )
      }}
      myMessageTheme={myMessageTheme}
      InputButtons={RenderNothing}
      SendButton={RenderNothing}
      onLongPressMessage={handleToggleMessageSelection}
      MessageContent={MessageContent}
      {...props}
    />
  )
}
