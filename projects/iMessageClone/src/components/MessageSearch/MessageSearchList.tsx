import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Spinner, vw, useTheme} from 'stream-chat-react-native';

import type {MessageResponse} from 'stream-chat';
import {MessageSearchItem} from './MessageSearchItem';

const styles = StyleSheet.create({
  contentContainer: {flexGrow: 1},
  date: {
    fontSize: 12,
    marginLeft: 2,
    textAlign: 'right',
  },
  detailsText: {fontSize: 12},
  flex: {flex: 1},
  indicatorContainer: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  itemContainer: {
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  message: {
    flexShrink: 1,
    fontSize: 12,
  },
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 8,
  },
  title: {fontSize: 14, fontWeight: '700'},
  titleContainer: {
    maxWidth: vw(80) - 16 - 40,
  },
});

type MessageSearchListProps = {
  EmptySearchIndicator: React.ComponentType;
  loading: boolean;
  loadMore: () => void;
  messages: MessageResponse[] | undefined;
  refreshing: boolean;
  refreshList: () => void;
  setChannelWithId: (channelId: string, messageId?: string) => Promise<void>;
};
export const MessageSearchList: React.FC<MessageSearchListProps> = ({
  EmptySearchIndicator,
  loading,
  loadMore,
  messages,
  refreshing,
  refreshList,
  setChannelWithId,
}) => {
  const {
    theme: {
      colors: {white_snow},
    },
  } = useTheme();

  if (loading && !refreshing && (!messages || messages.length === 0)) {
    return (
      <View
        style={[
          styles.indicatorContainer,
          {
            backgroundColor: white_snow,
          },
        ]}>
        <Spinner />
      </View>
    );
  }
  if (!messages && !refreshing) {
    return null;
  }

  return (
    <>
      <FlatList
        contentContainerStyle={[
          styles.contentContainer,
          {
            backgroundColor: white_snow,
          },
        ]}
        // TODO: Remove the following filter once we have two way scroll functionality on threads.
        data={messages ? messages.filter(({parent_id}) => !parent_id) : []}
        ListEmptyComponent={EmptySearchIndicator}
        keyboardDismissMode="on-drag"
        onEndReached={loadMore}
        onRefresh={refreshList}
        refreshing={refreshing}
        renderItem={({item}) => (
          <MessageSearchItem item={item} setChannelWithId={setChannelWithId} />
        )}
        style={styles.flex}
      />
    </>
  );
};
