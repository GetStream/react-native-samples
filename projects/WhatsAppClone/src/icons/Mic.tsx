import React from 'react'
import {IconProps, RootPath, RootSvg} from 'stream-chat-react-native'

export default (props: IconProps) => (
  <RootSvg {...props} viewBox="0 0 24 24">
    <RootPath
      d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2z"
      {...props}
    />
  </RootSvg>
)
