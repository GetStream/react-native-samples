import React, {useContext, useCallback} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ChannelSort} from 'stream-chat';
import {ChannelList, Chat, Search, useTheme} from 'stream-chat-react-native';

import {ChannelPreviewMessenger} from '../../components/ChannelPreview';
import {MessageSearchList} from '../../components/MessageSearch';
import {chatClient, user} from '../../client';
import {AppContext} from '../../contexts/AppContext';
import {SearchContext} from '../../contexts/SearchContext';
import {NavigationParamsList} from '../Screens';

const filters = {
  members: {$in: [user.id]},
  type: 'messaging',
};

const sort: ChannelSort = {last_message_at: -1};

const additionalFlatListProps = {
  keyboardDismissMode: 'on-drag' as const,
  getItemLayout: (_: any, index: number) => ({
    index,
    length: 65,
    offset: 65 * index,
  }),
};

type ChannelListScreenProps = {
  navigation: StackNavigationProp<NavigationParamsList, 'Main'>;
};

const options = {
  presence: true,
  state: true,
  watch: true,
};

const styles = StyleSheet.create({
  channelListContainer: {
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
  emptyIndicatorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  emptyIndicatorText: {paddingTop: 28},
  flex: {
    flex: 1,
  },
  searchContainer: {
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 1,
    flexDirection: 'row',
    margin: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    includeFontPadding: false, // for android vertical text centering
    padding: 0, // removal of default text input padding on android
    paddingHorizontal: 10,
    paddingTop: 0, // removal of iOS top padding for weird centering
    textAlignVertical: 'center', // for android vertical text centering
  },
});

export const ChannelListScreen: React.FC<ChannelListScreenProps> = ({
  navigation,
}) => {
  const {setChannel, setChannelWithId} = useContext(AppContext);

  const {
    theme: {
      colors: {grey, grey_gainsboro},
    },
  } = useTheme();

  const {
    searchQuery,
    loading,
    loadMore,
    messages,
    refreshing,
    refreshList,
  } = useContext(SearchContext);

  const EmptySearchIndicator = () => (
    <View style={styles.emptyIndicatorContainer}>
      <Search height={112} pathFill={grey_gainsboro} width={112} />
      <Text style={[styles.emptyIndicatorText, {color: grey}]}>
        {`No results for "${searchQuery}"`}
      </Text>
    </View>
  );

  const onSelect = useCallback(
    channel => {
      setChannel(channel);
      navigation.navigate('Main', {screen: 'Channel'});
    },
    [navigation, setChannel],
  );

  return (
    <Chat client={chatClient}>
      <View style={StyleSheet.absoluteFill}>
        {(!!searchQuery || (messages && messages.length > 0)) && (
          <MessageSearchList
            EmptySearchIndicator={EmptySearchIndicator}
            loading={loading}
            loadMore={loadMore}
            messages={messages}
            refreshing={refreshing}
            refreshList={refreshList}
            setChannelWithId={setChannelWithId}
          />
        )}
        <View style={{flex: searchQuery ? 0 : 1}}>
          <View
            style={[
              styles.channelListContainer,
              {opacity: searchQuery ? 0 : 1},
            ]}>
            <ChannelList
              additionalFlatListProps={additionalFlatListProps}
              filters={filters}
              HeaderNetworkDownIndicator={() => null}
              maxUnreadCount={99}
              onSelect={onSelect}
              options={options}
              Preview={ChannelPreviewMessenger}
              sort={sort}
            />
          </View>
        </View>
      </View>
    </Chat>
  );
};
