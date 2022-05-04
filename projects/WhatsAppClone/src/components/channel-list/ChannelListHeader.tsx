import {SafeAreaView, StatusBar, Text, View} from 'react-native'
import {colors} from '../../theme'
import React, {useContext} from 'react'
import {flex, sizes} from '../../global'
import IconButton from '../IconButton'
import PeekabooView from '../PeekabooView'
import {AppContext} from '../../App'
import {isEmpty} from 'lodash'

export default () => {
  const {selectedChannelsForEditing, setSelectedChannelsForEditing} =
    useContext(AppContext)

  const isInChannelelectionMode = !isEmpty(selectedChannelsForEditing)
  const handleMuteOnPress = () => {
    selectedChannelsForEditing.map(channel => channel?.mute())

    setSelectedChannelsForEditing([])
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.dark.secondary,
        ...flex.directionRowItemsCenter,
      }}>
      <StatusBar backgroundColor={colors.dark.secondary} />
      <PeekabooView isEnabled={isInChannelelectionMode}>
        <View style={flex.directionRowItemsCenterContentSpaceBetween1}>
          <View style={flex.directionRowItemsCenter}>
            <IconButton
              // onPress={clearSelectedMessageIdsEditing}
              iconName={'ArrowLeft'}
              pathFill={colors.dark.text}
            />
            <Text
              numberOfLines={1}
              style={{
                color: colors.dark.text,
                fontWeight: 'bold',
                fontSize: sizes.l,
              }}>
              2{/*{selectedMessageIdsEditing.length}*/}
            </Text>
          </View>

          <View style={flex.directionRowItemsCenter}>
            <IconButton
              // isEnabled={selectedMessageIdsEditing.length === 1}
              // onPress={handleReplyOnPress}
              iconName={'Trash'}
              // style={styles.buttonWrapper}
              pathFill={colors.dark.text}
            />
            <IconButton
              // isEnabled={selectedMessageIdsEditing.length === 1}
              // onPress={handleReplyOnPress}
              iconName={'Pin'}
              // style={styles.buttonWrapper}
              pathFill={colors.dark.text}
            />
            <IconButton
              // isEnabled={selectedMessageIdsEditing.length === 1}
              onPress={handleMuteOnPress}
              iconName={'Smiley'}
              // style={styles.buttonWrapper}
              pathFill={colors.dark.text}
            />
          </View>
        </View>
      </PeekabooView>
      <PeekabooView isEnabled={!isInChannelelectionMode}>
        <View style={{padding: sizes.m, flex: 1}}>
          <Text
            style={{
              color: colors.dark.secondaryLight,
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            WhatsApp
          </Text>
        </View>
        <IconButton
          onPress={() => null}
          iconName={'MagnifyingGlass'}
          pathFill={colors.dark.secondaryLight}
        />
        <IconButton
          onPress={() => null}
          iconName={'Menu'}
          pathFill={colors.dark.secondaryLight}
        />
      </PeekabooView>
    </SafeAreaView>
  )
}
