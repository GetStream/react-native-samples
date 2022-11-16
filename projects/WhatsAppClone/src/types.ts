import {CHANNEL_STACK} from './stacks/ChannelStack'
import {ROOT_STACK} from './stacks/RootStack'

export type LocalAttachmentType = {
  file_size?: number
  mime_type?: string
}
export type LocalChannelType = Record<string, unknown>
export type LocalCommandType = string
export type LocalEventType = Record<string, unknown>
export type LocalMessageType = Record<string, unknown>
export type LocalReactionType = Record<string, unknown>
export type LocalUserType = {
  image?: string
}

export type StreamChatGenerics = {
  attachmentType: LocalAttachmentType
  channelType: LocalChannelType
  commandType: LocalCommandType
  eventType: LocalEventType
  messageType: LocalMessageType
  reactionType: LocalReactionType
  userType: LocalUserType
}

export enum BackgroundTypes {
  bright = 'Bright',
  dark = 'Dark',
  solidColors = 'Solid Colours',
}

export type StackNavigatorParamList = {
  [ROOT_STACK.CHANNEL_SCREEN]: undefined
  [CHANNEL_STACK.IMAGE_PREVIEW]: undefined
  [CHANNEL_STACK.CHANNEL_SCREEN]: {
    channelId: string
  }
  [CHANNEL_STACK.CUSTOM_WALLPAPER]: {
    channelId: string | undefined
  }
  [CHANNEL_STACK.WALLPAPER_TYPES_OVERVIEW]: {
    channelId: string
  }
  [CHANNEL_STACK.WALLPAPER_TYPE_DETAILS]: {
    type: BackgroundTypes
    channelId: string
  }
}
