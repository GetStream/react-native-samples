import React from 'react';
import {IconProps, RootSvg, RootPath} from 'stream-chat-react-native';

export const BackButton: React.FC<IconProps> = props => (
  <RootSvg {...props} viewBox="0 0 50 50">
    <RootPath
      d="M 34.960938 2.9804688 A 2.0002 2.0002 0 0 0 33.585938 3.5859375 L 13.585938 23.585938 A 2.0002 2.0002 0 0 0 13.585938 26.414062 L 33.585938 46.414062 A 2.0002 2.0002 0 1 0 36.414062 43.585938 L 17.828125 25 L 36.414062 6.4140625 A 2.0002 2.0002 0 0 0 34.960938 2.9804688 z"
      {...props}
    />
  </RootSvg>
);
