import React from 'react';
import {ChannelSort} from 'stream-chat';
import {StackScreenProps} from '@react-navigation/stack';
import {StyleSheet, View} from 'react-native';
import {ChannelList} from 'stream-chat-react-native';
import {NavigationParamsList, StreamChatGenerics} from '../common/types';
import {useAppContext} from '../common/AppContext';
import {usersWithToken} from '../data/usersWithToken';

type ChannelListScreenProps = StackScreenProps<
  NavigationParamsList,
  'ChannelList'
>;

const members = usersWithToken.map(user => user.id);

const filters = {
  members: {$in: members},
  type: 'messaging',
};

const options = {
  presence: true,
  state: true,
  watch: true,
  limit: 30,
};

const sort: ChannelSort<StreamChatGenerics> = {last_updated: -1};

const ChannelListScreen: React.FC<ChannelListScreenProps> = ({navigation}) => {
  const {setChannel} = useAppContext();

  return (
    <View style={styles.container}>
      <ChannelList<StreamChatGenerics>
        filters={filters}
        onSelect={channel => {
          setChannel(channel);
          navigation.navigate('Channel');
        }}
        options={options}
        sort={sort}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});

export default ChannelListScreen;
