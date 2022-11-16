import {Alert, SafeAreaView, StyleSheet, Text, View} from 'react-native'
import {colors} from '../../theme'
import React, {useMemo} from 'react'
import {useAppContext} from '../../App'
import {flex, sizes} from '../../global'
import IconButton from '../IconButton'
import SuperAvatar from '../SuperAvatar'
import {useNavigation} from '@react-navigation/native'
import PeekabooView from '../PeekabooView'
import {get, isEmpty} from 'lodash'
import {MessageType, useMessagesContext} from 'stream-chat-react-native-core'
import {chatClient} from '../../client'
import {
  MessageStatusTypes,
  useChannelPreviewDisplayName,
} from 'stream-chat-react-native'
import {CHANNEL_STACK} from '../../stacks/ChannelStack'
import {StackNavigationProp} from '@react-navigation/stack'
import {StackNavigatorParamList} from '../../types'

export default () => {
  const {navigate, goBack} =
    useNavigation<StackNavigationProp<StackNavigatorParamList>>()
  const {
    channel,
    selectedMessageIdsEditing,
    setSelectedMessageIdsEditing,
    messageInputRef,
  } = useAppContext()
  const displayName = useChannelPreviewDisplayName(channel, 30)
  const {setQuotedMessageState, removeMessage, updateMessage} =
    useMessagesContext()
  const areAllMessagesPinned = useMemo(() => {
    const messages = channel?.state.messages.filter(({id}) =>
      selectedMessageIdsEditing.includes(id),
    )
    return messages?.every(({pinned}) => !!pinned)
  }, [channel?.id, JSON.stringify(selectedMessageIdsEditing)])

  const handleMenuOnPress = () =>
    navigate(CHANNEL_STACK.CUSTOM_WALLPAPER, {channelId: channel?.id})
  const clearSelectedMessageIdsEditing = () => setSelectedMessageIdsEditing([])
  const handleReplyOnPress = () => {
    const message = channel?.state.messages.find(
      ({id}) => id === get(selectedMessageIdsEditing, 0, 'id'),
    ) as MessageType

    clearSelectedMessageIdsEditing()
    setQuotedMessageState(message)
    messageInputRef?.current?.focus()
  }

  const handleToggleStarOnPress = async () => {
    const messages = channel?.state.messages.filter(({id}) =>
      selectedMessageIdsEditing.includes(id),
    ) as MessageType[]

    await Promise.all(
      messages?.map(message => {
        if (!areAllMessagesPinned && !message.pinned) {
          return chatClient.pinMessage(message, null)
        } else if (!!areAllMessagesPinned) {
          return chatClient.unpinMessage(message)
        }
      }),
    )

    clearSelectedMessageIdsEditing()
  }

  const handleDeleteMessageOnPress = async () => {
    const messages = channel?.state.messages.filter(({id}) =>
      selectedMessageIdsEditing.includes(id),
    ) as MessageType[]

    Alert.alert(
      'Delete Message',
      'Are you sure you want to permanently delete this message?',
      [
        {onPress: clearSelectedMessageIdsEditing, text: 'Cancel'},
        {
          onPress: async () => {
            await Promise.all(
              messages?.map(async message => {
                if (message.status === MessageStatusTypes.FAILED) {
                  removeMessage(message)
                } else {
                  const data = await chatClient.deleteMessage(message.id)
                  updateMessage(data.message)
                }
              }),
            )
            clearSelectedMessageIdsEditing()
          },
          style: 'destructive',
          text: 'Delete',
        },
      ],
      {cancelable: false},
    )
  }

  const isInMessageSelectionMode = !isEmpty(selectedMessageIdsEditing)

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.dark.secondary,
        ...flex.directionRowItemsCenter,
      }}>
      <PeekabooView isEnabled={isInMessageSelectionMode}>
        <View style={flex.directionRowItemsCenterContentSpaceBetween1}>
          <View style={flex.directionRowItemsCenter}>
            <IconButton
              onPress={clearSelectedMessageIdsEditing}
              iconName={'ArrowLeft'}
              pathFill={colors.dark.text}
            />
            <Text numberOfLines={1} style={styles.selectedMessagesCountText}>
              {selectedMessageIdsEditing.length}
            </Text>
          </View>

          <View style={flex.directionRowItemsCenter}>
            <IconButton
              isEnabled={selectedMessageIdsEditing.length === 1}
              onPress={handleReplyOnPress}
              iconName={'ReplyArrow'}
              style={styles.buttonWrapper}
              pathFill={colors.dark.text}
            />
            <>
              <IconButton
                onPress={handleToggleStarOnPress}
                iconName={'Star'}
                style={styles.buttonWrapper}
                pathFill={colors.dark.text}
              />
              <PeekabooView isEnabled={areAllMessagesPinned}>
                <View style={styles.unpinnedIcon} />
              </PeekabooView>
            </>

            <IconButton
              onPress={handleDeleteMessageOnPress}
              iconName={'Trash'}
              style={styles.buttonWrapper}
              pathFill={colors.dark.text}
            />
          </View>
        </View>
      </PeekabooView>
      <PeekabooView isEnabled={!isInMessageSelectionMode}>
        <IconButton
          onPress={goBack}
          iconName={'ArrowLeft'}
          pathFill={colors.dark.text}
        />
        <SuperAvatar isSelected={false} channel={channel} size={32} />
        <View style={{padding: sizes.m, flex: 1}}>
          <Text
            numberOfLines={1}
            style={{
              color: colors.dark.text,
              fontWeight: 'bold',
              fontSize: sizes.l,
            }}>
            {displayName}
          </Text>
        </View>
        <IconButton
          onPress={() => null}
          iconName={'Video'}
          pathFill={colors.dark.text}
        />
        <IconButton
          onPress={() => null}
          iconName={'Call'}
          pathFill={colors.dark.text}
        />
        <IconButton
          onPress={handleMenuOnPress}
          iconName={'Menu'}
          pathFill={colors.dark.text}
        />
      </PeekabooView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  selectedMessagesCountText: {
    color: colors.dark.text,
    fontWeight: 'bold',
    fontSize: sizes.l,
  },
  unpinnedIcon: {
    position: 'relative',
    zIndex: 10,
    backgroundColor: colors.dark.secondary,
    top: 0,
    right: 32,
    width: 4,
    height: 36,
    transform: [{rotateX: '-45deg'}, {rotateZ: '-45deg'}],
  },
  buttonWrapper: {
    marginHorizontal: sizes.m,
  },
})
