import {Pressable, StyleSheet, Text, View} from 'react-native'
import React, {useContext, useMemo, useState} from 'react'
import {useChannelPreviewDisplayName} from 'stream-chat-react-native-core/src/components/ChannelPreview/hooks/useChannelPreviewDisplayName'
import {
  ChannelPreviewMessage,
  ChannelPreviewTitle,
} from 'stream-chat-react-native'
import {AppContext, StreamChannel} from '../../App'
import {ChannelPreviewMessengerProps} from 'stream-chat-react-native-core/src/components/ChannelPreview/ChannelPreviewMessenger'
import {useNavigation} from '@react-navigation/native'
import {colors} from '../../theme'
import {Check, CheckAll} from 'stream-chat-react-native-core/src/icons/index'
import {useTheme} from 'stream-chat-react-native-core/src/contexts/themeContext/ThemeContext'
import {flex, sizes} from '../../global'
import Muted from '../../icons/Muted'
import Pinned from '../../icons/Pin'
import SuperAvatar from '../SuperAvatar'
import PeekabooView from '../PeekabooView'
import Mic from '../../icons/Mic'
import {get} from 'lodash'
import moment from 'moment'
import {LatestMessagePreview} from 'stream-chat-react-native-core/lib/typescript/components/ChannelPreview/hooks/useLatestMessagePreview'
import {parseDurationTextToMs} from '../../utils/conversion'

export default ({
  channel,
  latestMessagePreview,
  formatLatestMessageDate,
}: ChannelPreviewMessengerProps) => {
  const {navigate} = useNavigation()
  const {selectedChannelsForEditing, setSelectedChannelsForEditing} =
    useContext(AppContext)
  const displayName = useChannelPreviewDisplayName(channel)
  const [somneState, setSomeState] = useState(0)
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
    navigate('Channel', {
      channelId: channel.id,
    })
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
      onLongPress={handleOnLongPress}
      key={somneState}>
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
          <PeekabooView isEnabled={isChannelMuted} style={{marginRight: 12}}>
            <Muted pathFill={colors.dark.secondaryLight} width={16} />
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
