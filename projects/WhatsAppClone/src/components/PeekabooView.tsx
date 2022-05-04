import React, {Fragment} from 'react'
import {ViewProps} from 'react-native'

interface Props extends ViewProps {
  isEnabled: boolean | undefined
}
export default ({isEnabled, ...props}: Props) => {
  if (!isEnabled) return null
  return <Fragment {...props} />
}
