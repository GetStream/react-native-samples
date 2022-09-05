import React, {Fragment} from 'react'

interface Props {
  isEnabled: boolean | undefined
  children: React.ReactNode
}
export default ({isEnabled, children}: Props) => {
  if (!isEnabled) return null
  return <Fragment children={children} />
}
