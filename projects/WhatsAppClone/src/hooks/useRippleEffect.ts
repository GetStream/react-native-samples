import {
  measure,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import {GestureResponderEvent, PressableProps, View} from 'react-native'
import {
  GestureEventPayload,
  TapGestureHandlerGestureEvent,
  TapGestureHandlerEventPayload,
} from 'react-native-gesture-handler'

export default ({
  onPress,
}: {
  onPress: (
    event: Readonly<GestureEventPayload & TapGestureHandlerEventPayload>,
  ) => void
}) => {
  const centerX = useSharedValue(0)
  const centerY = useSharedValue(0)
  const scale = useSharedValue(0)
  const ref = useAnimatedRef<View>()
  const width = useSharedValue(0)
  const height = useSharedValue(0)

  const rippleOpacity = useSharedValue(1)

  const tapGestureEvent =
    useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
      onStart: tapEvent => {
        const layout = measure(ref)
        width.value = layout.width
        height.value = layout.height

        centerX.value = tapEvent.x
        centerY.value = tapEvent.y

        rippleOpacity.value = 1
        scale.value = 0
        scale.value = withTiming(1, {duration: 1000})
      },
      onActive: tapEvent => {
        if (onPress) {
          runOnJS(onPress)(tapEvent)
        }
      },
      onFinish: () => {
        rippleOpacity.value = withTiming(0)
      },
    })

  const rStyle = useAnimatedStyle(() => {
    const circleRadius = Math.sqrt(width.value ** 2 + height.value ** 2)

    const translateX = centerX.value - circleRadius
    const translateY = centerY.value - circleRadius

    return {
      width: circleRadius * 2,
      height: circleRadius * 2,
      borderRadius: circleRadius,
      opacity: rippleOpacity.value,
      backgroundColor: 'rgba(143,153,161, 0.3)',
      position: 'absolute',
      top: 0,
      left: 0,
      transform: [
        {translateX},
        {translateY},
        {
          scale: scale.value,
        },
      ],
    }
  })

  return {ref, tapGestureEvent, rStyle}
}
