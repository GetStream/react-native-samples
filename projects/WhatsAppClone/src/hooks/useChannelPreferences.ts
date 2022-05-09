import {get} from 'lodash'
import {useMMKVObject} from 'react-native-mmkv'

type ChannelPreferences = {
  imageUri: string
  backgroundColor: number[] | undefined
  dimValue: number
}

type ReturnValue = {
  channelPreferences: ChannelPreferences
  setPreferences(value: Partial<ChannelPreferences>): void
  clearPreferences(): void
  getProperty(
    propertyName: keyof ChannelPreferences,
    defaultValue?: any,
  ): ChannelPreferences
  setProperty(propertyName: string, propertyValue: any): void
}

export const DEFAULT_CHANNEL_PREFERENCES = {
  imageUri: 'https://i.redd.it/3jfjc53fsyb61.jpg',
  backgroundColor: undefined,
  dimValue: 0.25,
}

export default (channelId: string): ReturnValue => {
  const [
    channelPreferences = DEFAULT_CHANNEL_PREFERENCES,
    setChannelPreferences,
  ] = useMMKVObject<ChannelPreferences>(channelId)

  const setProperty = (propertyName: string, propertyValue: any) =>
    setChannelPreferences({
      ...channelPreferences,
      [propertyName]: propertyValue,
    })

  const setPreferences = (value: Partial<ChannelPreferences>) => {
    setChannelPreferences({...channelPreferences, ...(value as Object)})
  }

  const clearPreferences = () => {
    setChannelPreferences(undefined)
  }

  const getProperty = (
    propertyName: keyof ChannelPreferences,
    defaultValue?: any,
  ): any => get(channelPreferences, propertyName, defaultValue)

  return {
    channelPreferences,
    setPreferences,
    clearPreferences,
    setProperty,
    getProperty,
  }
}
