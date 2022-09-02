import React, {useContext, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';

import {useAttachmentPickerContext} from 'stream-chat-react-native';

import {Channel} from '../../components';
import {AppContext} from '../../contexts';

export const ChannelScreen = () => {
  const headerHeight = useHeaderHeight();
  const {setTopInset} = useAttachmentPickerContext();
  const {channel} = useContext(AppContext);

  useEffect(() => {
    setTopInset(headerHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerHeight]);

  return (
    <SafeAreaView>
      <Channel channel={channel} keyboardVerticalOffset={headerHeight} />
    </SafeAreaView>
  );
};
