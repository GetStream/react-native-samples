import React from 'react'
import {Avatar, useChannelPreviewDisplayAvatar} from 'stream-chat-react-native'
import {StyleSheet, View} from 'react-native'
import {colors} from '../theme'
import {Check} from 'stream-chat-react-native-core/src/icons/index'
import {StreamChannel} from '../App'

export interface SuperAvatarProps {
  channel: StreamChannel
  isSelected?: boolean
  size?: number
}

export default ({channel, isSelected = false, size = 32}: SuperAvatarProps) => {
  if (!channel) return null

  const {image, name} = useChannelPreviewDisplayAvatar(channel)
  return (
    <View style={styles.outerContainer}>
      <Avatar image={image} name={name} size={size} />
      {isSelected && (
        <View style={styles.checkWrap}>
          <Check pathFill={colors.dark.background} width={16} height={16} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  outerContainer: {flex: 0},
  checkWrap: {
    padding: 2,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.dark.highlighted,
    backgroundColor: colors.dark.primaryLight,
    position: 'absolute',
    bottom: -4,
    right: -4,
  },
})
