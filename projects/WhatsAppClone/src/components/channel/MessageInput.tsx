import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {
  AutoCompleteInput,
  LocalMessageInputContext,
  useAttachmentPickerContext,
  useMessageInputContext,
} from 'stream-chat-react-native'
import {takePhoto} from 'stream-chat-react-native-core/src/native'
import {Alert, SafeAreaView, StyleSheet, Text, View} from 'react-native'
import {flex, sizes} from '../../global'
import {colors} from '../../theme'
import IconButton from '../IconButton'
import Reply from './Reply'
import {useAppContext} from '../../App'
import moment from 'moment'
import RecordingBlinking from '../../icons/RecordingBlinking'
import PeekabooView from '../PeekabooView'
import MessageInputCTA from './MessageInputCTA'
import {useNavigation} from '@react-navigation/native'
import {get, isEmpty, size, values} from 'lodash'
import {ChannelState} from 'stream-chat'
import {StackNavigatorParamList, StreamChatGenerics} from '../../types'
import {CHANNEL_STACK} from '../../stacks/ChannelStack'
import {StackNavigationProp} from '@react-navigation/stack'

export default () => {
  const {
    editing,
    fileUploads,
    imageUploads,
    uploadNewImage,
    quotedMessage,
    text,
    compressImageQuality,
    pickFile,
    sendMessage,
  } = useMessageInputContext()
  const [recordingActive, setRecordingActive] = useState(false)
  const [recordingDurationInMS, setRecordingDurationInMS] = useState(0)
  const {closePicker, setSelectedImages, setSelectedPicker} =
    useAttachmentPickerContext()
  const {messageInputRef, channel} = useAppContext()
  const {navigate} =
    useNavigation<StackNavigationProp<StackNavigatorParamList>>()

  const numberOfFiles = fileUploads.length
  const channelMembers = get(channel, [
    'state',
    'members',
  ]) as ChannelState<StreamChatGenerics>['members']
  const numberOfMembers = size(channelMembers)
  const recipientChannelMemberName = get(values(channelMembers), [
    1,
    'user',
    'name',
  ])

  const isMessageEmpty = useMemo(
    () => !text && !imageUploads.length && !fileUploads.length,
    [text, imageUploads.length, fileUploads.length],
  )

  const takeAndUploadImage = useCallback(async () => {
    setSelectedPicker(undefined)
    closePicker()
    const photo = await takePhoto({compressImageQuality})
    if (!photo.cancelled) {
      await uploadNewImage(photo)
      navigate(CHANNEL_STACK.IMAGE_PREVIEW)
    }
  }, [closePicker, compressImageQuality, setSelectedImages, setSelectedPicker])

  useEffect(() => {
    if (numberOfFiles === 0) return
    const allFilesAreReady = fileUploads.every(f => !isEmpty(f.url))

    if (!allFilesAreReady) return

    const fileUploadsDescription =
      numberOfFiles > 1
        ? `${numberOfFiles} files`
        : `'${get(fileUploads, [0, 'file', 'name'])}'`

    const membersDescription =
      numberOfMembers > 2
        ? `all ${numberOfMembers} members`
        : `${recipientChannelMemberName}`

    Alert.alert(
      'Send file/s',
      `Send ${fileUploadsDescription} to ${membersDescription}?`,
      [
        {onPress: () => null, text: 'Cancel'},
        {
          onPress: sendMessage,
          text: 'Send',
        },
      ],
      {cancelable: true},
    )
  }, [JSON.stringify(fileUploads)])

  const isReplyPreviewEnabled = Boolean(
    (typeof editing !== 'boolean' && editing?.quoted_message) || quotedMessage,
  )

  const formattedAudioDuration = useMemo(
    () => moment(recordingDurationInMS).format('m:ss'),
    [recordingDurationInMS],
  )

  return (
    <SafeAreaView style={styles.outerContainer}>
      <View
        style={{
          ...styles.innerContainer,
          ...(isReplyPreviewEnabled
            ? {borderTopRightRadius: sizes.ml, borderTopLeftRadius: sizes.ml}
            : {}),
        }}>
        <Reply
          isPreview
          isEnabled={isReplyPreviewEnabled}
          message={quotedMessage}
        />
        <View style={flex.directionRowItemsCenter}>
          <PeekabooView isEnabled={recordingActive}>
            <RecordingBlinking />
            <View style={{flex: 1}}>
              <Text style={{color: colors.dark.secondaryLight}}>
                {formattedAudioDuration}
              </Text>
            </View>
          </PeekabooView>
          <PeekabooView isEnabled={!recordingActive}>
            <IconButton
              onPress={() => null}
              iconName={'Smiley'}
              pathFill={colors.dark.secondaryLight}
            />
            <AutoCompleteInput
              setInputBoxRef={
                messageInputRef as unknown as LocalMessageInputContext['setInputBoxRef']
              }
            />
            <IconButton
              onPress={pickFile}
              iconName={'Attachment'}
              pathFill={colors.dark.secondaryLight}
            />
            <IconButton
              isEnabled={isMessageEmpty}
              onPress={takeAndUploadImage}
              iconName={'Camera'}
              pathFill={colors.dark.secondaryLight}
            />
          </PeekabooView>
        </View>
      </View>
      <MessageInputCTA
        recordingActive={recordingActive}
        setRecordingActive={setRecordingActive}
        recordingDurationInMS={recordingDurationInMS}
        setRecordingDurationInMS={setRecordingDurationInMS}
      />
    </SafeAreaView>
  )
}

export const messageInputStyle = {
  backgroundColor: colors.dark.secondary,
  borderRadius: sizes.xl,
  marginHorizontal: sizes.s,
}
const styles = StyleSheet.create({
  outerContainer: {
    ...flex.directionRowItemsEnd,
    flexDirection: 'row',
    paddingVertical: sizes.s,
  },
  innerContainer: {
    ...messageInputStyle,
    flex: 1,
  },
})
