import {SafeAreaView, StatusBar, Text, View} from 'react-native'
import {colors} from '../theme'
import {flex, sizes} from '../global'
import React from 'react'
import IconButton from './IconButton'
import {useNavigation} from '@react-navigation/native'

export default ({title}: {title: string}) => {
  const {goBack} = useNavigation()

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.dark.secondary,
        ...flex.directionRowItemsCenter,
      }}>
      <StatusBar backgroundColor={colors.dark.secondary} />
      <IconButton
        onPress={goBack}
        iconName={'ArrowLeft'}
        pathFill={colors.dark.text}
      />
      <View style={{padding: sizes.m, flex: 1}}>
        <Text
          style={{
            color: colors.dark.text,
            fontWeight: 'bold',
            fontSize: 18,
          }}>
          {title}
        </Text>
      </View>
    </SafeAreaView>
  )
}
