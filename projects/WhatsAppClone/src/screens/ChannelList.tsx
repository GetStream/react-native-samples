import React, {useMemo, useState} from 'react'
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native'
import {SceneMap, TabBar, TabView} from 'react-native-tab-view'
import {colors} from '../theme'
import {SceneRendererProps} from 'react-native-tab-view/src/types'
import {
  NavigationState,
  Scene,
} from 'react-native-tab-view/lib/typescript/types'
import Camera from '../icons/Camera'
import {
  CallsPage,
  CameraPage,
  ChatsPage,
  StatusPage,
} from '../components/channel-list/Pages'
import Animated, {SlideOutUp} from 'react-native-reanimated'
import ChannelListHeader from '../components/channel-list/ChannelListHeader'
import {size} from 'lodash'

const renderScene = SceneMap({
  camera: CameraPage,
  chats: ChatsPage,
  status: StatusPage,
  calls: CallsPage,
})

const ROUTES = [
  {key: 'camera'},
  {key: 'chats', title: 'CHATS'},
  {key: 'status', title: 'STATUS'},
  {key: 'calls', title: 'CALLS'},
]

export default () => {
  const layout = useWindowDimensions()
  const [index, setIndex] = useState(1)
  const itemWidth = useMemo(() => layout.width / size(ROUTES), [layout.width])

  const renderLabel = ({
    focused,
    route,
  }: Scene<any> & {
    focused: boolean
    color: string
  }) => {
    const color = focused
      ? colors.dark.primaryLight
      : colors.dark.secondaryLight

    return route.key === 'camera' ? (
      <Camera pathFill={color} />
    ) : (
      <View
        style={{
          width: itemWidth,
          alignItems: 'center',
        }}>
        <Text style={{color, fontWeight: 'bold'}}>{route.title}</Text>
      </View>
    )
  }

  const renderTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<any>
    },
  ) => {
    return (
      <Animated.View exiting={SlideOutUp} collapsable={false}>
        <TabBar
          {...props}
          indicatorStyle={styles.indicator}
          renderLabel={renderLabel}
          style={styles.tabBar}
          tabStyle={styles.tabStyle}
        />
      </Animated.View>
    )
  }

  return (
    <View style={{flex: 1, backgroundColor: colors.dark.background}}>
      <ChannelListHeader />
      <TabView
        navigationState={{index, routes: ROUTES}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width, height: layout.height}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.dark.secondary,
  },
  indicator: {
    backgroundColor: colors.dark.primaryLight,
    height: 3,
  },
  label: {
    fontWeight: 'bold',
  },
  tabStyle: {
    width: 'auto',
  },
})
