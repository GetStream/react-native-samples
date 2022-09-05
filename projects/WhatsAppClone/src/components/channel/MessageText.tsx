import moment from 'moment'
import {StyleSheet, Text, View} from 'react-native'
import {flex, sizes} from '../../global'
import Star from '../../icons/Star'
import {colors} from '../../theme'
import {
  MessageStatus,
  useMessageContext,
  useTheme,
} from 'stream-chat-react-native'
import type {MessageTextProps, RenderTextParams} from 'stream-chat-react-native'
import React, {useMemo} from 'react'
import PeekabooView from '../PeekabooView'
import {StreamChatGenerics} from '../../types'
import {isEmpty} from 'lodash'

const MessageText = ({renderText, ...props}: MessageTextProps) => {
  const {message} = useMessageContext()
  const {
    theme: {
      colors: themeColors,
      messageSimple: {
        content: {markdown},
      },
    },
  } = useTheme()

  const messageCreationTime = moment(message?.created_at).format('HH:mm')
  const isMessageDeleted = useMemo(
    () => !isEmpty(message.deleted_at),
    [message.id],
  )

  return (
    <View style={flex.directionRowItemsEndContentSpaceBetween}>
      <View style={styles.textWrapper}>
        {renderText({
          ...props,
          colors: themeColors,
          markdownStyles: markdown,
        } as RenderTextParams<StreamChatGenerics>)}
      </View>
      <View style={styles.infoContainer}>
        <PeekabooView isEnabled={message?.pinned && !isMessageDeleted}>
          <Star
            pathFill={colors.dark.primaryTransparent}
            width={sizes.m}
            height={sizes.m}
            style={{marginRight: sizes.s}}
          />
        </PeekabooView>
        <Text
          style={{
            color: isMessageDeleted
              ? colors.dark.secondaryLight
              : colors.dark.primaryTransparent,
            fontSize: 12,
          }}>
          {messageCreationTime}
        </Text>
        <MessageStatus />
      </View>
    </View>
  )
}

export default MessageText as React.ComponentType<
  MessageTextProps<StreamChatGenerics>
>

const styles = StyleSheet.create({
  textWrapper: {
    flexGrow: 1,
    flexShrink: 1,
    marginRight: sizes.sm,
  },
  infoContainer: {
    ...flex.directionRowItemsCenter,
    padding: sizes.xs,
  },
})
