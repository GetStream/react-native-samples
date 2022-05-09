import React from 'react'
import Animated from 'react-native-reanimated'
import {PressableProps, View, ViewProps} from 'react-native'
import {TapGestureHandler} from 'react-native-gesture-handler'
import useRippleEffect from '../hooks/useRippleEffect'

type Props = ViewProps & {onPress: PressableProps['onPress']}

export default ({children, onPress, style = {}, ...props}: Props) => {
  const {ref, tapGestureEvent, rStyle} = useRippleEffect({onPress})

  return (
    <View ref={ref} {...props}>
      <TapGestureHandler onGestureEvent={tapGestureEvent}>
        <Animated.View style={[{overflow: 'hidden'}, style]}>
          {children}
          <Animated.View style={rStyle} />
        </Animated.View>
      </TapGestureHandler>
    </View>
  )
}
