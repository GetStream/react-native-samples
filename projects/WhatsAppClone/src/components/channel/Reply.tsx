import {Image, StyleSheet, Text, View} from 'react-native'
import {sizes} from '../../global'
import {colors} from '../../theme'
import IconButton from '../IconButton'
import React, {useMemo} from 'react'
import {MessageResponse} from 'stream-chat'
import {
  MessageType,
  useMessageContext,
  useMessageInputContext,
  vw,
} from 'stream-chat-react-native'
import {capitalize, get, isEmpty} from 'lodash'
import {useAppContext} from '../../App'

interface Props {
  isPreview?: boolean
  isEnabled?: boolean
  message: boolean | MessageType | MessageResponse['quoted_message']
}

const USER_COLORS = [
  '#d968b0',
  '#0091aa',
  '#d2290a',
  '#559800',
  '#52a1f3',
  '#14c796',
  '#ff512c',
  '#ff6300',
  '#a18df6',
  '#7c64f5',
  '#00a400',
]

const userIdToColorLookUp: {[key: string]: string} = {}
const generateRandomColor = () =>
  USER_COLORS[Math.round(Math.random() * (USER_COLORS.length - 1))]

const calculateUserColor = (userId: string | undefined): string => {
  if (!userId) return USER_COLORS[0]
  const assignedColor = get(userIdToColorLookUp, userId)
  if (assignedColor) return assignedColor
  userIdToColorLookUp[userId] = generateRandomColor()
  return userIdToColorLookUp[userId]
}

const CloseButton = ({
  isEnabled,
  onPress,
}: {
  isEnabled?: boolean
  onPress: () => void
}) => (
  <IconButton
    isEnabled={isEnabled}
    style={styles.iconButton}
    width={sizes.ml}
    height={sizes.ml}
    onPress={onPress}
    iconName={'CircleClose'}
    pathFill={colors.dark.secondary}
  />
)

export default ({
  message,
  isPreview = true,
  isEnabled = true,
}: Props): JSX.Element | null => {
  if (!isEnabled || typeof message === 'boolean') return null

  const {
    editing,
    quotedMessage,
    clearEditingState,
    resetInput,
    clearQuotedMessageState,
  } = useMessageInputContext()
  const {messageInputRef} = useAppContext()
  const {isMyMessage} = useMessageContext()

  const handleOnPress = () => {
    messageInputRef?.current?.blur()
    resetInput()
    editing && clearEditingState()
    quotedMessage && clearQuotedMessageState()
  }
  const {user, attachments, text} = message as MessageType

  const {
    messageText,
    authorName = 'Unknown User',
    imageURI,
    userColor,
  } = useMemo(() => {
    return {
      userColor: calculateUserColor(user?.id),
      messageText: text || capitalize(get(attachments, [0, 'type'])),
      authorName: user?.name,
      imageURI:
        get(attachments, [0, 'image_url']) ||
        get(attachments, [0, 'asset_url']) ||
        get(attachments, [0, 'thumb_url']),
    }
  }, [text, user?.id, message?.id])

  return (
    <View
      style={{
        ...styles.containerBase,
        ...(isPreview
          ? styles.containerPreview
          : {
              ...styles.containerMessage,
              backgroundColor: isMyMessage
                ? colors.dark.primaryDark
                : colors.dark.highlighted,
            }),
      }}>
      <View
        style={{
          flexDirection: 'row',
          flex: isPreview ? 1 : 0,
          maxWidth: !isPreview && !isEmpty(imageURI) ? '80%' : undefined,
        }}>
        <View style={{backgroundColor: userColor, width: sizes.s}} />
        <View style={styles.textContainer}>
          <Text
            style={{color: userColor, marginBottom: sizes.s}}
            numberOfLines={1}>
            {authorName}
          </Text>
          <Text style={{color: colors.dark.secondaryLight}} numberOfLines={2}>
            {messageText}
          </Text>
        </View>
      </View>

      <Image style={styles.imagePreview} source={{uri: imageURI}} />
      <CloseButton isEnabled={isPreview} onPress={handleOnPress} />
    </View>
  )
}

const styles = StyleSheet.create({
  containerBase: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
    borderRadius: sizes.m,
  },
  containerPreview: {
    margin: sizes.m,
    marginBottom: 0,
    backgroundColor: colors.dark.highlighted,
  },
  containerMessage: {
    maxWidth: vw(80),
  },
  textContainer: {
    padding: sizes.m,
  },
  imagePreview: {
    alignItems: 'flex-end',
    width: 60,
  },
  iconButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: sizes.s,
    margin: sizes.s,
    backgroundColor: colors.dark.transparentPrimary,
  },
})
