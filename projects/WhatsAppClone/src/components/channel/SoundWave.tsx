import React, {useMemo} from 'react'
import {StyleSheet, View} from 'react-native'
import {colors} from '../../theme'
import {flex, sizes} from '../../global'

type Props = {
  assetUrl: string
  isMyMessage: boolean
  currentPositionInSeconds: number
  currentDurationInSeconds: number
}

const BAR_AMOUNT = 64
const BAR_MAX_SIZE = 34

export default ({
  assetUrl,
  isMyMessage,
  currentPositionInSeconds,
  currentDurationInSeconds,
}: Props) => {
  const progressionPercentage = useMemo(
    () => (currentPositionInSeconds / currentDurationInSeconds) * 100,
    [currentDurationInSeconds, currentPositionInSeconds],
  )

  const wavePattern = useMemo(
    () => ({
      id: assetUrl,
      items: new Array(BAR_AMOUNT)
        .fill(null)
        .map((_, i) => Math.round(Math.random() * BAR_MAX_SIZE) + 2),
    }),
    [assetUrl],
  )

  return (
    <View style={styles.container}>
      <GeneratedWave
        assetUrl={assetUrl}
        progressionPercentage={progressionPercentage}
        wavePattern={wavePattern}
      />
      <View
        style={{
          ...styles.progressBall,
          backgroundColor: isMyMessage
            ? colors.dark.secondaryLight
            : colors.dark.active,
          left: `${progressionPercentage}%`,
        }}
      />
    </View>
  )
}

type GeneratedWaveProps = Pick<Props, 'assetUrl'> & {
  progressionPercentage: number
  wavePattern: {
    id: string
    items: number[]
  }
}

const GeneratedWave = React.memo(
  ({assetUrl, progressionPercentage, wavePattern}: GeneratedWaveProps) => {
    return (
      <View key={assetUrl} style={flex.directionRowItemsContentCenter}>
        {wavePattern.items.map((height, i) => {
          const alpha =
            progressionPercentage >= ((i + 1) / BAR_AMOUNT) * 100 ? 0.75 : 0.25
          return (
            <View
              key={i}
              style={{
                ...styles.barItem,
                height,
                backgroundColor: `rgba(180,180,180, ${alpha})`,
              }}
            />
          )
        })}
      </View>
    )
  },
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: sizes.xl,
    paddingVertical: sizes.s,
  },
  barItem: {
    width: sizes.xs,
    borderRadius: sizes.l,
    backgroundColor: colors.dark.transparentPrimary,
    marginHorizontal: 0.5,
  },
  progressBall: {
    position: 'absolute',
    width: sizes.ml,
    height: sizes.ml,
    borderRadius: sizes.l,
  },
})
