import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {useEffect} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useOverlayContext, Channel, Thread} from 'stream-chat-react-native';
import {useHeaderHeight} from '@react-navigation/elements';
import {StreamChatGenerics, NavigationParamsList} from '../common/types';
import {useAppContext} from '../common/AppContext';

type ThreadScreenProps = StackScreenProps<NavigationParamsList, 'Thread'>;

const ThreadScreen: React.FC<ThreadScreenProps> = ({navigation}) => {
  const {channel, setThread, thread} = useAppContext();
  const headerHeight = useHeaderHeight();
  const {overlay} = useOverlayContext();

  useEffect(() => {
    navigation.setOptions({
      gestureEnabled: Platform.OS === 'ios' && overlay === 'none',
    });
  }, [overlay, navigation]);

  if (!channel) {
    return null;
  }

  return (
    <SafeAreaView edges={['bottom']}>
      <Channel
        audioRecordingEnabled={true}
        channel={channel}
        keyboardVerticalOffset={headerHeight}
        thread={thread}
        threadList>
        <View style={styles.container}>
          <Thread<StreamChatGenerics>
            onThreadDismount={() => setThread(null)}
          />
        </View>
      </Channel>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});

export default ThreadScreen;
