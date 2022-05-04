import React from 'react'
import {IconProps, RootPath, RootSvg} from 'stream-chat-react-native'

export default (props: IconProps) => (
  <RootSvg {...props} viewBox="0 0 24 24">
    <RootPath
      d="M20 2H8c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM8 16V4h12l.002 12H8z"
      {...props}
    />
    <RootPath d="M4 8H2v12c0 1.103.897 2 2 2h12v-2H4V8z" {...props} />
    <RootPath d="m12 12-1-1-2 3h10l-4-6z" {...props} />
  </RootSvg>
)
