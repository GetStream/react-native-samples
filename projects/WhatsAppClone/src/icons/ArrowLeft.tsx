import React from 'react'
import {IconProps, RootPath, RootSvg} from 'stream-chat-react-native'

export default (props: IconProps) => (
  <RootSvg {...props} viewBox="0 0 24 24">
    <RootPath
      d="m12 4 1.4 1.4L7.8 11H20v2H7.8l5.6 5.6L12 20l-8-8 8-8z"
      {...props}
    />
  </RootSvg>
)
