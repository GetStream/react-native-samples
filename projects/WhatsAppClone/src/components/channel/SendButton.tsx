import React from 'react'
import {Pressable, StyleSheet} from 'react-native'
import {useMessageInputContext} from 'stream-chat-react-native'
import {colors} from '../../theme'
import Send from '../../icons/Send'
import Mic from '../../icons/Mic'

export const SendButton = () => {
  const {fileUploads, imageUploads, sendMessage, text} =
    useMessageInputContext()
  const isMessageEmpty = !text && !imageUploads.length && !fileUploads.length
  const Icon = isMessageEmpty ? Mic : Send

  return (
    <Pressable onPress={sendMessage} style={styles.pressable}>
      <Icon pathFill={colors.dark.text} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  pressable: {
    backgroundColor: colors.dark.primaryLight,
    padding: 10,
    borderRadius: 24,
  },
})
