import {Pressable, StyleSheet, Text, View} from 'react-native'
import React, {useMemo} from 'react'
import {
  ChannelPreviewMessage,
  ChannelPreviewMessengerProps,
  ChannelPreviewTitle,
  Check,
  CheckAll,
  LatestMessagePreview,
  useChannelPreviewDisplayName,
  useTheme,
} from 'stream-chat-react-native'
import {StreamChannel, useAppContext} from '../../App'
import {useNavigation} from '@react-navigation/native'
import {colors} from '../../theme'
import {flex, sizes} from '../../global'
import Muted from '../../icons/Muted'
import Pinned from '../../icons/Pin'
import SuperAvatar from '../SuperAvatar'
import PeekabooView from '../PeekabooView'
import Mic from '../../icons/Mic'
import {get} from 'lodash'
import moment from 'moment'
import {parseDurationTextToMs} from '../../utils/conversion'
import {ROOT_STACK} from '../../stacks/RootStack'
import {StackNavigationProp} from '@react-navigation/stack'
import {StackNavigatorParamList} from '../../types'

export default ({
  channel,
  latestMessagePreview,
  formatLatestMessageDate,
}: ChannelPreviewMessengerProps) => {
  const {navigate} =
    useNavigation<StackNavigationProp<StackNavigatorParamList>>()

  const {setChannel} = useAppContext()
  const {selectedChannelsForEditing, setSelectedChannelsForEditing} =
    useAppContext()
  const displayName = useChannelPreviewDisplayName(channel)
  const {
    theme: {
      channelPreview: {checkAllIcon, checkIcon, date},
      colors: {grey},
    },
  } = useTheme()
  const isChannelMuted = channel.muteStatus().muted
  const {status, messageObject} = latestMessagePreview
  const createdAt = latestMessagePreview.messageObject?.created_at
  const latestMessageDate = messageObject?.createdAt
    ? new Date(createdAt as string)
    : new Date()
  const isPinned = false

  const toggleChannelSelectionForEditing = (selectedChannel: StreamChannel) => {
    setSelectedChannelsForEditing(channels => {
      const existsInSelectedChannels = channels.includes(selectedChannel)
      return existsInSelectedChannels
        ? channels.filter(c => c !== selectedChannel)
        : [...channels, selectedChannel]
    })
  }
  const isSelectedForEditing = selectedChannelsForEditing.includes(channel)

  const isVoiceMessage =
    get(latestMessagePreview, ['messageObject', 'attachments', 0, 'type']) ===
    'voice-message'

  const handleOnPress = () => {
    setChannel(channel)
    navigate(ROOT_STACK.CHANNEL_SCREEN)
  }

  const handleOnLongPress = () => toggleChannelSelectionForEditing(channel)

  return (
    <Pressable
      style={{
        ...styles.container,
        backgroundColor: isSelectedForEditing
          ? colors.dark.highlighted
          : styles.container.backgroundColor,
      }}
      onPress={handleOnPress}
      onLongPress={handleOnLongPress}>
      <SuperAvatar
        channel={channel}
        isSelected={isSelectedForEditing}
        size={48}
      />
      <View style={{flex: 1, marginHorizontal: sizes.l}}>
        <ChannelPreviewTitle channel={channel} displayName={displayName} />
        <View style={{flexDirection: 'row', marginTop: sizes.xs}}>
          <PeekabooView isEnabled={status === 2}>
            <CheckAll pathFill={grey} {...checkAllIcon} />
          </PeekabooView>
          <PeekabooView isEnabled={status === 1}>
            <Check pathFill={grey} {...checkIcon} />
          </PeekabooView>
          <PeekabooView isEnabled={isVoiceMessage}>
            <ChannelVoiceMessagePreview
              latestMessagePreview={latestMessagePreview}
            />
          </PeekabooView>
          <PeekabooView isEnabled={!isVoiceMessage}>
            <ChannelPreviewMessage
              latestMessagePreview={latestMessagePreview}
            />
          </PeekabooView>
        </View>
      </View>
      <View style={{justifyContent: 'space-between'}}>
        <Text style={[styles.date, {color: grey}, date]}>
          {formatLatestMessageDate && latestMessageDate
            ? formatLatestMessageDate(latestMessageDate)
            : latestMessagePreview.created_at}
        </Text>
        <View style={flex.directionRowContentEnd}>
          <PeekabooView isEnabled={isChannelMuted}>
            <View style={{marginRight: 12}}>
              <Muted pathFill={colors.dark.secondaryLight} width={16} />
            </View>
          </PeekabooView>
          <PeekabooView isEnabled={isPinned}>
            <Pinned pathFill={colors.dark.secondaryLight} width={16} />
          </PeekabooView>
        </View>
      </View>
    </Pressable>
  )
}

const ChannelVoiceMessagePreview = ({
  latestMessagePreview,
}: {
  latestMessagePreview: LatestMessagePreview
}) => {
  const firstAttchmentAudioLength = get(latestMessagePreview, [
    'messageObject',
    'attachments',
    0,
    'audio_length',
  ])

  const audioLengthInSeconds = useMemo(
    () => parseDurationTextToMs(firstAttchmentAudioLength),
    [firstAttchmentAudioLength],
  )

  if (audioLengthInSeconds === 0) return null

  const formattedAudioDuration = moment(audioLengthInSeconds).format('m:ss')

  return (
    <View style={styles.voiceMessagePreview}>
      <Mic
        pathFill={colors.dark.secondaryLight}
        width={sizes.ml}
        height={sizes.ml}
      />
      <Text style={styles.voiceMessagePreviewText}>
        {formattedAudioDuration}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...flex.directionRow1,
    padding: sizes.l,
    backgroundColor: colors.dark.background,
    margin: 0,
  },
  contentContainer: {flex: 1},
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 8,
  },
  statusContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {fontSize: 14, fontWeight: '700'},
  date: {
    fontSize: 12,
    marginLeft: 2,
    textAlign: 'right',
  },
  voiceMessagePreview: {
    ...flex.directionRowItemsCenter,
  },
  voiceMessagePreviewText: {
    marginHorizontal: sizes.s,
    color: colors.dark.secondaryLight,
    fontSize: 14,
  },
})
