import React from 'react'
import {IconProps, RootPath, RootSvg} from 'stream-chat-react-native'

export default (props: IconProps) => (
  <RootSvg {...props} viewBox="0 0 512 512">
    <RootPath
      d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"
      {...props}
    />
  </RootSvg>
)
