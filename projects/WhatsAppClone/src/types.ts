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
  ChannelScreen: {
    channelId: string
  }
  CustomWallpaper: {
    channelId: string
  }
  WallpaperTypesOverview: {
    channelId: string
  }
  WallpaperTypeDetails: {
    type: BackgroundTypes
    channelId: string
  }
}
