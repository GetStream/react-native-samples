import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';

import {useAttachmentPickerContext} from 'stream-chat-react-native';

import {Channel} from '../../components';

export const ChannelScreen = () => {
  const headerHeight = useHeaderHeight();
  const {setTopInset} = useAttachmentPickerContext();

  useEffect(() => {
    setTopInset(headerHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerHeight]);

  return (
    <SafeAreaView>
      <Channel keyboardVerticalOffset={headerHeight} />
    </SafeAreaView>
  );
};
