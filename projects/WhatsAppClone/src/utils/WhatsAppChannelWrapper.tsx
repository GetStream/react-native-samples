import React, {PropsWithChildren, useContext, useEffect} from 'react'
import {useHeaderHeight} from '@react-navigation/stack'
import {
  Channel,
  useAttachmentPickerContext,
  useMessageContext,
  MessageTouchableHandlerPayload,
} from 'stream-chat-react-native'
import type {ChannelProps} from 'stream-chat-react-native'
import {myMessageTheme} from '../theme'
import RenderNothing from '../components/RenderNothing'
import Reply from '../components/channel/Reply'
import {isEmpty} from 'lodash'
import MessageContent from '../components/channel/MessageContent'
import MessageText from '../components/channel/MessageText'
import VoiceMessageAttachment from '../components/channel/VoiceMessageAttachment'
import {StreamChatGenerics} from '../types'
import {AppContext} from '../App'

export default ({
  channel,
  ...props
}: PropsWithChildren<ChannelProps<StreamChatGenerics>>) => {
  const {setSelectedMessageIdsEditing} = useContext(AppContext)
  const headerHeight = useHeaderHeight()
  const {setTopInset} = useAttachmentPickerContext()

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
    setTopInset(headerHeight)
  }, [headerHeight, setTopInset])

  useEffect(() => {
    setSelectedMessageIdsEditing([])
  }, [channel.id, setSelectedMessageIdsEditing])

  useEffect(() => {
    return () => setSelectedMessageIdsEditing([])
  }, [])

  return (
    <Channel
      Card={VoiceMessageAttachment}
      MessageAvatar={RenderNothing}
      ReactionList={RenderNothing}
      channel={channel}
      messageActions={param => {
        const {
          pinMessage,
          unpinMessage,
          quotedReply,
          deleteMessage,
          copyMessage,
        } = param
        return [
          quotedReply,
          pinMessage,
          unpinMessage,
          deleteMessage,
          copyMessage,
        ]
      }}
      MessageReplies={RenderNothing}
      MessageText={MessageText}
      keyboardVerticalOffset={headerHeight}
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
