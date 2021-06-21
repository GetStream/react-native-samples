import { useEffect, useMemo, useState } from 'react';

import ChannelsStore from '../utils/ChannelsStore';
import { ChatClientStore } from '../utils/ChatClientStore';
import { useMessageNewListener } from './listeners/useMessageNewListener';
import { useMessageReadListener } from './listeners/useMessageReadListener';
import { useNotificationAddedToChannelListener } from './listeners/useNotificationAddedToChannelListener';
import { useNotificationMessageNewListener } from './listeners/useNotificationMessageNewListener';

const sort = {
  has_unread: -1,
  last_message_at: -1,
};

const options = {
  limit: 10,
  offset: 0,
  state: true,
};

const chatClient = ChatClientStore.client;

export const useSlackChannels = () => {
  const [activeChannelId, setActiveChannelId] = useState(null);
  const [unreadChannels, setUnreadChannels] = useState([]);
  const [readChannels, setReadChannels] = useState([]);
  const [dmConversations, setDMConversations] = useState([]);

  // Base filter
  const filters = useMemo(
    () => ({
      members: {
        $in: [chatClient.user.id],
      },
      name: {
        $ne: '',
      },
      type: 'messaging',
    }),
    [chatClient.user.id],
  );

  const dmFilters = useMemo(
    () => ({
      members: {
        $in: [chatClient.user.id],
      },
      name: '',
      type: 'messaging',
    }),
    [chatClient.user.id],
  );

  useEffect(() => {
    const unreadChannels = [];
    const readChannels = [];
    const dmConversations = [];

    const fetchChannels = async () => {
      // Query channels where name is not empty.
      const channels = await chatClient.queryChannels(filters, sort, options);

      channels.forEach((c) => {
        if (c.countUnread() > 0) {
          unreadChannels.push(c);
        } else {
          readChannels.push(c);
        }
      });

      // Cache the data so that it can be used on other screens.
      ChannelsStore.channels = channels;
    };

    const fetchDMConversations = async () => {
      // Query channels where name is empty - direct messaging conversations
      const directMessagingChannels = await chatClient.queryChannels(
        dmFilters,
        sort,
        options,
      );

      directMessagingChannels.forEach((c) => {
        if (c.countUnread() > 0) {
          unreadChannels.push(c);
        } else {
          dmConversations.push(c);
        }
      });

      // Sort as per last received message.
      unreadChannels.sort((a, b) =>
        a.state.last_message_at > b.state.last_message_at ? -1 : 1,
      );

      // Cache the data so that it can be used on other screens.
      ChannelsStore.dmConversations = directMessagingChannels;
    };

    async function init() {
      await fetchChannels();
      await fetchDMConversations();

      setUnreadChannels([...unreadChannels]);
      setReadChannels([...readChannels]);
      setDMConversations([...dmConversations]);
    }

    init();
  }, []);

  useNotificationMessageNewListener(
    setDMConversations,
    setReadChannels,
    setUnreadChannels,
  );

  useNotificationAddedToChannelListener(
    setDMConversations,
    setReadChannels,
    setUnreadChannels,
  );

  useMessageNewListener(
    readChannels,
    unreadChannels,
    dmConversations,
    setDMConversations,
    setReadChannels,
    setUnreadChannels,
  );

  useMessageReadListener(
    readChannels,
    unreadChannels,
    dmConversations,
    setDMConversations,
    setReadChannels,
    setUnreadChannels,
  );

  return {
    activeChannelId,
    dmConversations,
    readChannels,
    setActiveChannelId,
    setDMConversations,
    setReadChannels,
    setUnreadChannels,
    unreadChannels,
  };
};
