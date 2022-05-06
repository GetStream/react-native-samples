import {
  ActivityIndicator,
  Image,
  Platform,
  SafeAreaView,
  View,
} from 'react-native'
import {get, isEmpty} from 'lodash'
import React, {useMemo} from 'react'
import {StackNavigationProp} from '@react-navigation/stack'
import {flex, sizes} from '../global'
import IconButton from '../components/IconButton'
import {colors} from '../theme'
import {
  useMessageInputContext,
  AutoCompleteInput,
} from 'stream-chat-react-native'
import {sendButtonStyle} from '../components/channel/MessageInputCTA'
import {messageInputStyle} from '../components/channel/MessageInput'
import PeekabooView from '../components/PeekabooView'
import Images from '../icons/Images'

export type ChannelScreenProps = {
  navigation: StackNavigationProp<{}>
}

export default ({navigation: {goBack}}: ChannelScreenProps) => {
  const {resetInput, imageUploads} = useMessageInputContext()
  const {sendMessage} = useMessageInputContext()
  const uri = useMemo(
    () => get(imageUploads, [0, 'url']),
    [JSON.stringify(imageUploads)],
  )

  const resetAndGoBack = () => {
    resetInput()
    goBack()
  }
  const handleSendOnPress = async () => {
    await sendMessage()
    resetAndGoBack()
  }

  return (
    <SafeAreaView
      style={{
        ...flex.contentSpaceBetween1,
        backgroundColor: colors.dark.background,
      }}>
      <View style={{...flex.directionRow1}}>
        <IconButton
          style={{alignSelf: 'flex-start'}}
          onPress={resetAndGoBack}
          iconName={'CircleClose'}
          pathFill={colors.dark.text}
        />
      </View>
      <PeekabooView isEnabled={!isEmpty(uri)}>
        <Image source={{uri}} style={{flex: 3}} />
      </PeekabooView>
      <PeekabooView isEnabled={isEmpty(uri)}>
        <View style={{flex: 3}}>
          <ActivityIndicator />
        </View>
      </PeekabooView>
      <View
        style={{
          ...flex.directionRowItemsContentEnd1,
          padding: sizes.s,
        }}>
        <View style={flex.directionRowItemsCenter1}>
          <View
            style={{
              ...messageInputStyle,
              ...flex.directionRowItemsCenter1,
              paddingHorizontal: sizes.ml,
              paddingVertical: Platform.OS === 'ios' ? sizes.ml : 0,
            }}>
            <Images
              pathFill={colors.dark.secondaryLight}
              style={{marginRight: sizes.m}}
            />
            <AutoCompleteInput
              additionalTextInputProps={{
                placeholder: 'Add a caption...',
                style: {
                  top: -2,
                  color: colors.dark.text,
                },
              }}
            />
          </View>
          <IconButton
            onPress={handleSendOnPress}
            iconName={'Send'}
            pathFill={colors.dark.text}
            style={sendButtonStyle}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
