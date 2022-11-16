import React from 'react'
import {Image, Pressable, SafeAreaView, StyleSheet, View} from 'react-native'
import {StackNavigationProp} from '@react-navigation/stack'
import {colors} from '../theme'
import {flex, sizes} from '../global'
import {BackgroundTypes, StackNavigatorParamList} from '../types'
import {RouteProp} from '@react-navigation/native'
import Header from '../components/Header'
import {get} from 'lodash'
import useChannelPreferences from '../hooks/useChannelPreferences'
import PeekabooView from '../components/PeekabooView'
import {BRIGHT_IMAGES, DARK_IMAGES, SOLID_COLORS} from '../consts'
import {CHANNEL_STACK} from '../stacks/ChannelStack'

export type CustomWallPaperScreenNavigationProp = StackNavigationProp<
  StackNavigatorParamList,
  CHANNEL_STACK.WALLPAPER_TYPE_DETAILS
>
export type CustomWallPaperRouteProp = RouteProp<
  StackNavigatorParamList,
  CHANNEL_STACK.WALLPAPER_TYPE_DETAILS
>

export type Props = {
  navigation: CustomWallPaperScreenNavigationProp
  route: CustomWallPaperRouteProp
}

const GRID_ITEM_WIDTH = '32.7%'

export type BackgroundItem = {
  imageUri?: string
  backgroundColor?: number[] | undefined
}
const typeToWallpaperItemLookUp: Record<BackgroundTypes, BackgroundItem[]> = {
  [BackgroundTypes.solidColors]: SOLID_COLORS,
  [BackgroundTypes.dark]: DARK_IMAGES,
  [BackgroundTypes.bright]: BRIGHT_IMAGES,
}

export default ({
  navigation: {navigate},
  route: {
    params: {type, channelId},
  },
}: Props) => {
  const {setPreferences} = useChannelPreferences(channelId)
  const wallpaperItems = get(typeToWallpaperItemLookUp, type)
  return (
    <>
      <Header title={type} />
      <SafeAreaView
        style={{
          ...flex.contentCenter1,
          backgroundColor: colors.dark.background,
        }}>
        <View style={styles.container}>
          {wallpaperItems?.map(({backgroundColor, imageUri = ''}, i) => {
            const handleOnPress = () => {
              setPreferences({backgroundColor, imageUri})
              navigate(CHANNEL_STACK.CUSTOM_WALLPAPER, {channelId})
            }

            const r = get(backgroundColor, 0)
            const g = get(backgroundColor, 1)
            const b = get(backgroundColor, 2)

            return (
              <Pressable
                key={i}
                onPress={handleOnPress}
                style={{
                  backgroundColor: `rgba(${r},${g},${b}, 1)`,
                  margin: sizes.xxs,
                  width: GRID_ITEM_WIDTH,
                }}>
                <PeekabooView isEnabled={!!imageUri}>
                  <Image style={styles.image} source={{uri: imageUri}} />
                </PeekabooView>
              </Pressable>
            )
          })}
        </View>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    ...flex.directionRow1,
    alignContent: 'stretch',
    flexWrap: 'wrap',
    padding: sizes.sm,
  },
  image: {
    flex: 1,
    width: '100%',
  },
})
