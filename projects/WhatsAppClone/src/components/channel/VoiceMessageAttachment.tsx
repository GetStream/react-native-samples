import React, {ComponentProps, useMemo, useState} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {
  Avatar,
  CardProps,
  MessageStatus,
  MessageType,
  useMessageContext,
} from 'stream-chat-react-native'
import {colors} from '../../theme'
import IconButton from '../IconButton'
import {flex, sizes} from '../../global'
import moment from 'moment'
import {AudioStatus, pausePlayer, startPlayer} from '../../utils/AudioManager'
import SoundWave from './SoundWave'
import Mic from '../../icons/Mic'
import {parseDurationTextToMs} from '../../utils/conversion'
import PeekabooView from '../PeekabooView'
import Star from '../../icons/Star'
import {isEmpty} from 'lodash'

const VoiceMessageAttachment = ({
  audio_length,
  asset_url: assetUrl,
  type,
  user,
}: CardProps & MessageType) => {
  const audioLength = audio_length as string
  const initialAudioLengthInSeconds = useMemo(
    () => parseDurationTextToMs(audioLength),
    [audioLength],
  )
  const [currentPositionInSeconds, setCurrentPositionInSeconds] = useState(0)
  const [paused, setPaused] = useState(false)
  const [currentDurationInSeconds, setCurrentDurationInSeconds] =
    useState<number>(initialAudioLengthInSeconds)
  const {isMyMessage, message} = useMessageContext()

  if (!audioLength) return null

  const onStartPlay = async () => {
    if (!assetUrl) return null

    await startPlayer(assetUrl, async ({status, data}) => {
      if (status === AudioStatus.STARTED) {
      } else if (status === AudioStatus.PLAYING) {
        setCurrentPositionInSeconds(data?.currentPosition as number)
        setCurrentDurationInSeconds(data?.duration as number)
      } else if (status === AudioStatus.PAUSED) {
        setPaused(true)
      } else if (status === AudioStatus.RESUMED) {
        setPaused(false)
      } else if (status === AudioStatus.STOPPED) {
        await onStopPlay()
      }
    })
  }

  const onPausePlay = async () => {
    await pausePlayer()
  }

  const onStopPlay = () => {
    setPaused(false)
    setCurrentPositionInSeconds(0)
  }

  if (type !== 'voice-message') {
    return null
  }

  const isPlaying = useMemo(
    () => currentPositionInSeconds > 0 && !paused,
    [currentPositionInSeconds, paused],
  )
  const currentPositionFormatted = useMemo(
    () => moment(currentPositionInSeconds).format('m:ss'),
    [currentPositionInSeconds],
  )
  const durationFormatted = useMemo(
    () => moment(currentDurationInSeconds).format('m:ss'),
    [currentDurationInSeconds],
  )

  const isMessageDeleted = useMemo(
    () => !isEmpty(message.deleted_at),
    [message.id],
  )

  return (
    <View
      style={{
        ...styles.outerContainer,
        flexDirection: isMyMessage ? 'row' : 'row-reverse',
      }}>
      <View>
        <Avatar image={user?.image} name={user?.name || user?.id} size={48} />
        <Mic
          pathFill={
            isMyMessage ? colors.dark.secondaryLight : colors.dark.active
          }
          style={{
            position: 'absolute',
            bottom: 0,
            ...(isMyMessage ? {right: -sizes.m} : {left: -sizes.m}),
          }}
        />
      </View>

      <View style={styles.container}>
        <IconButton
          isEnabled={!isPlaying}
          iconName={'Play'}
          onPress={onStartPlay}
          pathFill={colors.dark.secondaryLight}
          style={styles.playButton}
        />
        <IconButton
          isEnabled={isPlaying}
          width={sizes.l}
          height={sizes.l}
          iconName={'Pause'}
          onPress={onPausePlay}
          pathFill={colors.dark.secondaryLight}
          style={styles.pauseButton}
        />
        <View style={styles.progressDetailsContainer}>
          <SoundWave
            assetUrl={assetUrl as string}
            isMyMessage={isMyMessage}
            currentDurationInSeconds={currentDurationInSeconds}
            currentPositionInSeconds={currentPositionInSeconds}
          />
          <View style={flex.directionRowContentSpaceBetween}>
            <Text style={styles.progressInfoText}>
              {currentPositionFormatted}
            </Text>
            <View style={flex.directionRowItemsCenter}>
              <PeekabooView isEnabled={message?.pinned && !isMessageDeleted}>
                <Star
                  pathFill={colors.dark.primaryTransparent}
                  width={sizes.m}
                  height={sizes.m}
                  style={{marginRight: sizes.s}}
                />
              </PeekabooView>
              <Text style={styles.progressInfoText}>{durationFormatted}</Text>
              <MessageStatus />
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default VoiceMessageAttachment as React.ComponentType

const styles = StyleSheet.create({
  outerContainer: {
    ...flex.directionRowItemsContentCenter,
    paddingHorizontal: sizes.ml,
  },
  container: {
    flexDirection: 'row',
    padding: 5,
    width: 250,
  },
  playButton: {
    margin: 0,
    padding: sizes.s,
  },
  pauseButton: {
    margin: 0,
    padding: sizes.m,
  },
  progressDetailsContainer: {
    height: 58,
    flex: 1,
    justifyContent: 'space-between',
  },
  progressInfoText: {
    color: colors.dark.secondaryLight,
    fontSize: 12,
  },
})
