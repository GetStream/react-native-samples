import React from 'react'
import {Pressable, StyleSheet, Text, View} from 'react-native'
import {StackNavigationProp} from '@react-navigation/stack'
import {colors} from '../theme'
import {flex, sizes} from '../global'
import Slider from '@react-native-community/slider'
import {StackNavigatorParamList} from '../types'
import {RouteProp} from '@react-navigation/native'
import useChannelPreferences from '../hooks/useChannelPreferences'
import {useAppContext} from '../App'
import {useChannelPreviewDisplayName} from 'stream-chat-react-native-core/src/components/ChannelPreview/hooks/useChannelPreviewDisplayName'
import SuperAvatar from '../components/SuperAvatar'
import Header from '../components/Header'
import Attachment from '../icons/Attachment'
import Camera from '../icons/Camera'
import Smiley from '../icons/Smiley'
import Mic from '../icons/Mic'
import ChannelBackgroundWrapper from '../utils/ChannelBackgroundWrapper'
import {vh} from 'stream-chat-react-native'
import {CHANNEL_STACK} from '../stacks/ChannelStack'

export type CustomWallPaperScreenNavigationProp = StackNavigationProp<
  StackNavigatorParamList,
  'CustomWallpaper'
>
export type CustomWallPaperRouteProp = RouteProp<
  StackNavigatorParamList,
  'CustomWallpaper'
>

export type Props = {
  navigation: CustomWallPaperScreenNavigationProp
  route: CustomWallPaperRouteProp
}

export default ({
  navigation: {navigate},
  route: {
    params: {channelId},
  },
}: Props) => {
  const {setProperty, channelPreferences} = useChannelPreferences(channelId)
  const {channel} = useAppContext()
  const displayName = useChannelPreviewDisplayName(channel, 30)
  const {dimValue} = channelPreferences

  const handleOnValueChange = (value: number) => setProperty('dimValue', value)

  const handleChangeOnPress = () =>
    navigate(CHANNEL_STACK.WALLPAPER_TYPES_OVERVIEW, {channelId})

  return (
    <>
      <Header title={'Custom Wallpaper'} />
      <View
        style={{
          ...flex.contentCenter1,
          backgroundColor: colors.dark.background,
        }}>
        <View style={flex.itemsCenter}>
          <View style={styles.screenContainer}>
            <ChannelBackgroundWrapper
              channelId={channelId}
              style={StyleSheet.absoluteFill}>
              <View style={styles.headerContainer}>
                <SuperAvatar channel={channel} size={sizes.l} />
                <Text style={styles.displayName}>{displayName}</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  padding: sizes.m,
                }}>
                <View style={styles.messageBubbleSmall} />
                <View style={styles.messageBubble} />
                <View style={styles.messageBubbleMedium} />
              </View>
              <View
                style={{
                  padding: sizes.s,
                  ...flex.directionRowItemsCenter,
                }}>
                <View style={styles.messageInputContainer}>
                  <Smiley {...iconProps} />
                  <View style={{flexDirection: 'row'}}>
                    <Attachment
                      {...iconProps}
                      style={{marginRight: sizes.ml}}
                    />
                    <Camera {...iconProps} style={{marginRight: sizes.m}} />
                  </View>
                </View>
                <View style={styles.micWrapper}>
                  <Mic {...iconProps} pathFill={colors.dark.text} />
                </View>
              </View>
            </ChannelBackgroundWrapper>
          </View>
          <Pressable
            style={{padding: sizes.s, marginBottom: sizes.l}}
            onPress={handleChangeOnPress}>
            <Text style={{color: colors.dark.primaryLight}}>CHANGE</Text>
          </Pressable>
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.dimmingText}>Wallpaper Dimming</Text>
          <Slider
            minimumValue={0}
            thumbTintColor={colors.dark.primaryLight}
            minimumTrackTintColor={colors.dark.primaryLight}
            maximumTrackTintColor={colors.dark.text}
            value={dimValue}
            onValueChange={handleOnValueChange}
          />
        </View>
      </View>
    </>
  )
}

const iconProps = {
  pathFill: colors.dark.secondaryLight,
  width: sizes.l,
  height: sizes.l,
}

const messageBubble = {
  width: 160,
  backgroundColor: colors.dark.secondary,
  height: sizes.xxl,
  borderRadius: sizes.ml,
  marginBottom: sizes.m,
}

const styles = StyleSheet.create({
  screenContainer: {
    alignItems: 'center',
    width: 240,
    maxHeight: 480,
    height: vh(60),
    borderRadius: sizes.ml,
    borderWidth: sizes.xs,
    borderColor: colors.dark.border,
    overflow: 'hidden',
    margin: sizes.l,
  },
  headerContainer: {
    ...flex.directionRowItemsCenter,
    padding: sizes.m,
    backgroundColor: colors.dark.secondary,
  },
  displayName: {
    color: colors.dark.text,
    fontWeight: 'bold',
    fontSize: sizes.m,
    marginLeft: sizes.m,
  },
  messageBubble: messageBubble,
  messageBubbleSmall: {
    ...messageBubble,
    alignSelf: 'center',
    width: 60,
  },
  messageBubbleMedium: {
    ...messageBubble,
    alignSelf: 'flex-end',
    backgroundColor: colors.dark.primary,
  },
  messageInputContainer: {
    backgroundColor: colors.dark.secondary,
    padding: sizes.m,
    marginRight: sizes.s,
    borderRadius: sizes.xl,
    ...flex.directionRowItemsCenterContentSpaceBetween1,
  },
  micWrapper: {
    padding: sizes.m,
    backgroundColor: colors.dark.primaryLight,
    borderRadius: sizes.xl,
  },
  footerContainer: {
    flex: 1,
    padding: sizes.xl,
  },
  dimmingText: {
    color: colors.dark.text,
    fontWeight: 'bold',
    fontSize: sizes.ml,
  },
})
