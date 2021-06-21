import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import { ModalScreenHeader } from '../../components/ModalScreenHeader';
import { SCText } from '../../components/SCText';
import { usePaginatedSearchedChannels } from '../../hooks/usePaginatedSearchedChannels';
import ChannelsStore from '../../utils/ChannelsStore';
import { ChatClientStore } from '../../utils/ChatClientStore';
import { ChannelSearchInput } from './ChannelSearchInput';
import { ChannelSearchList } from './ChannelSearchList';

const styles = StyleSheet.create({
  searchResultsContainer: {
    paddingTop: 10,
  },
  searchResultsContainerTitle: {
    fontWeight: '500',
    paddingBottom: 10,
    paddingLeft: 10,
    paddingTop: 10,
  },
});

const chatClient = ChatClientStore.client;
export const ChannelSearchScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const [searchText, setSearchText] = useState('');

  const queryFiltersChannels = useMemo(
    () => ({
      members: {
        $in: [chatClient.user?.id],
      },
      name: {
        $autocomplete: searchText,
      },
      type: 'messaging',
    }),
    [searchText],
  );

  const { channels: results } =
    usePaginatedSearchedChannels(queryFiltersChannels);

  const channels =
    results?.length > 0 ? results : ChannelsStore.recentConversations;
  const onSubmit = ({ nativeEvent: { text } }) => {
    setSearchText(text);
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
      }}>
      <View>
        <ModalScreenHeader goBack={navigation.goBack} title='Channels' />
        <ChannelSearchInput onSubmit={onSubmit} />
        <View style={styles.searchResultsContainer}>
          {!searchText && (
            <SCText style={styles.searchResultsContainerTitle}>Recent</SCText>
          )}
          <ChannelSearchList channels={channels} />
        </View>
      </View>
    </SafeAreaView>
  );
};
