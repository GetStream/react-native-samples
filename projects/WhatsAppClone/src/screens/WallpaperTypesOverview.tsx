import React from 'react'
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import {StackNavigationProp} from '@react-navigation/stack'
import {colors} from '../theme'
import {flex, sizes} from '../global'
import {BackgroundTypes, StackNavigatorParamList} from '../types'
import {RouteProp} from '@react-navigation/native'
import Header from '../components/Header'
import {get} from 'lodash'
import Trash from '../icons/Trash'
import useChannelPreferences from '../hooks/useChannelPreferences'
import {CHANNEL_STACK} from '../stacks/ChannelStack'

export type CustomWallPaperScreenNavigationProp = StackNavigationProp<
  StackNavigatorParamList,
  CHANNEL_STACK.WALLPAPER_TYPES_OVERVIEW
>
export type CustomWallPaperRouteProp = RouteProp<
  StackNavigatorParamList,
  CHANNEL_STACK.WALLPAPER_TYPES_OVERVIEW
>

export type Props = {
  navigation: CustomWallPaperScreenNavigationProp
  route: CustomWallPaperRouteProp
}

const backgroundTypeToImageUri = {
  [BackgroundTypes.bright]:
    'https://images.unsplash.com/photo-1548195667-1d329af0a472?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80',
  [BackgroundTypes.dark]:
    'https://images.unsplash.com/photo-1548063032-ce4d0e5aab66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80',
  [BackgroundTypes.solidColors]:
    'https://images.unsplash.com/photo-1548890232-88737d2917c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1036&q=80',
}

const GRID_ITEM_WIDTH = '47.7%'

export default ({
  navigation: {navigate},
  route: {
    params: {channelId},
  },
}: Props) => {
  const {clearPreferences} = useChannelPreferences(channelId)

  const handleRemoveCustomBackground = () => {
    clearPreferences()
    navigate(CHANNEL_STACK.CUSTOM_WALLPAPER, {channelId})
  }

  return (
    <>
      <Header title={'Custom Wallpaper'} />
      <SafeAreaView
        style={{
          ...flex.contentCenter1,
          backgroundColor: colors.dark.background,
        }}>
        <View style={styles.container}>
          {Object.values(BackgroundTypes).map((type, i) => {
            return (
              <Pressable
                key={i}
                onPress={() =>
                  navigate(CHANNEL_STACK.WALLPAPER_TYPE_DETAILS, {
                    type,
                    channelId,
                  })
                }
                style={styles.imageButton}>
                <Image
                  style={styles.image}
                  source={{uri: get(backgroundTypeToImageUri, type)}}
                />
                <Text style={{color: colors.dark.text}}>{type}</Text>
              </Pressable>
            )
          })}
        </View>
        <View style={{flex: 1}}>
          <Pressable
            style={{padding: sizes.xl, ...flex.directionRowItemsCenter}}
            onPress={handleRemoveCustomBackground}>
            <Trash
              pathFill={colors.dark.danger}
              style={{
                marginRight: sizes.l,
              }}
            />
            <Text style={{color: colors.dark.danger}}>
              Remove custom wallpaper
            </Text>
          </Pressable>
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
  imageButton: {
    borderRadius: sizes.m,
    margin: sizes.s,
    width: GRID_ITEM_WIDTH,
  },
  image: {
    flex: 1,
    borderRadius: sizes.m,
    marginBottom: sizes.m,
  },
})
