import React from 'react'
import RenderNothing from './RenderNothing'
import {globalStyles, sizes} from '../global'
import {colors} from '../theme'
import Video from '../icons/Video'
import {Pressable, PressableProps, StyleProp, ViewStyle} from 'react-native'
import Menu from '../icons/Menu'
import Call from '../icons/Call'
import ArrowLeft from '../icons/ArrowLeft'
import Smiley from '../icons/Smiley'
import Camera from '../icons/Camera'
import Attachment from '../icons/Attachment'
import Send from '../icons/Send'
import Mic from '../icons/Mic'
import MagnifyingGlass from '../icons/MagnifyingGlass'
import CircleClose from '../icons/CircleClose'
import ReplyArrow from '../icons/ReplyArrow'
import Pause from '../icons/Pause'
import Play from '../icons/Play'
import Pin from '../icons/Pin'
import Trash from '../icons/Trash'
import Images from '../icons/Images'
import Star from '../icons/Star'
import Unstar from '../icons/Unstar'
import Muted from '../icons/Muted'

const iconNameToComponentLookUp = {
  Video,
  Menu,
  Call,
  ArrowLeft,
  Smiley,
  Camera,
  Attachment,
  Send,
  Mic,
  MagnifyingGlass,
  CircleClose,
  ReplyArrow,
  Play,
  Pause,
  Pin,
  Trash,
  Images,
  Star,
  Unstar,
  Muted,
}

interface IconButtonProps extends PressableProps {
  usePressable?: boolean
  isEnabled?: boolean
  iconName: keyof typeof iconNameToComponentLookUp
  pathFill: string
  onPress?: PressableProps['onPress']
  style?: StyleProp<ViewStyle>
  width?: number
  height?: number
}

export default ({
  isEnabled = true,
  usePressable = false,
  iconName,
  pathFill = colors.dark.secondaryLight,
  style = {},
  width = sizes.xl,
  height = sizes.xl,
  ...props
}: IconButtonProps) => {
  if (!isEnabled) return null

  const IconComponent = iconNameToComponentLookUp[iconName] || RenderNothing
  const content = (
    <IconComponent pathFill={pathFill} width={width} height={height} />
  )
  if (usePressable)
    return (
      <Pressable
        {...props}
        style={{...globalStyles.iconWrap, ...(style as object)}}>
        {content}
      </Pressable>
    )

  return (
    <Pressable
      onPress={props.onPress}
      style={{...globalStyles.iconWrap, ...(style as object)}}>
      {content}
    </Pressable>
  )
}
