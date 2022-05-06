import React from 'react'
import {Avatar, useChannelPreviewDisplayAvatar} from 'stream-chat-react-native'
import {StyleSheet, View} from 'react-native'
import {colors} from '../theme'
import {Check} from 'stream-chat-react-native-core/src/icons/index'
import {StreamChannel} from '../App'
import {sizes} from '../global'

export interface SuperAvatarProps {
  channel: StreamChannel
  isSelected?: boolean
  size?: number
}

export default ({
  channel,
  isSelected = false,
  size = sizes.xl + sizes.xs,
}: SuperAvatarProps) => {
  if (!channel) return null

  const {image, name} = useChannelPreviewDisplayAvatar(channel)
  return (
    <View style={styles.outerContainer}>
      <Avatar image={image} name={name} size={size} />
      {isSelected && (
        <View style={styles.checkWrap}>
          <Check
            pathFill={colors.dark.background}
            width={sizes.l}
            height={sizes.l}
          />
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
    left: sizes.xxl,
    top: sizes.xxl,
  },
})
