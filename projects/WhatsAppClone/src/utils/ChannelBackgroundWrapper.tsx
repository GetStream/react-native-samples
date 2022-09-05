import React from 'react'
import {ImageBackground, View, ViewProps} from 'react-native'
import useChannelPreferences, {
  DEFAULT_CHANNEL_PREFERENCES,
} from '../hooks/useChannelPreferences'
import {get, isEmpty} from 'lodash'
import PeekabooView from '../components/PeekabooView'

interface Props extends ViewProps {
  channelId: string
}

export default ({channelId, ...props}: Props) => {
  const {channelPreferences} = useChannelPreferences(channelId)
  const {dimValue = 0.75, backgroundColor, imageUri} = channelPreferences
  let uri: string | undefined = DEFAULT_CHANNEL_PREFERENCES.imageUri
  if (!isEmpty(backgroundColor)) {
    uri = undefined
  } else if (!isEmpty(imageUri)) {
    uri = imageUri
  }

  const r = get(backgroundColor, 0)
  const g = get(backgroundColor, 1)
  const b = get(backgroundColor, 2)
  return (
    <View {...props}>
      <PeekabooView isEnabled={!!uri}>
        <ImageBackground
          {...props}
          imageStyle={{
            opacity: 1 - dimValue,
          }}
          source={{uri}}
        />
      </PeekabooView>
      <PeekabooView isEnabled={!isEmpty(backgroundColor)}>
        <View
          {...props}
          style={{
            ...(props.style as Object),
            backgroundColor: `rgba(${r},${g},${b}, ${1 - dimValue})`,
          }}
        />
      </PeekabooView>
    </View>
  )
}
