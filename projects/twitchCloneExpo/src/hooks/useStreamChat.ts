import { useEffect, useRef, useState } from 'react';
import { Streami18n } from 'stream-chat-expo';
import { StreamChat } from 'stream-chat';


import type { Client, LocalUserType, Channel } from '../../types';



const useConnectUser = ({
  client,
  user,
  userToken,
  liveStreamID,
}: {
  client: Client,
  user: LocalUserType,
  userToken: string,
  liveStreamID: string,
}) => {
  const [userIsConnected, setUserConnected] = useState(false);
  const isConnectingUser = useRef(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [channel, setChannel] = useState<Channel | null>(null);


  useEffect(() => {
    let newChannel: Channel;

    const connectUser = async () => {
      try {
        await client.connectUser(user, userToken);
        // TODO: Dynamically select channel
        newChannel = client.channel("livestream", liveStreamID);

        await newChannel.watch();

        setChannel(newChannel as Channel);

        setUserConnected(true);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);
          setErrorMessage("Error Loading Stream: ${error.message}");
        }
      } finally {
        isConnectingUser.current = false;
      }
    };

    if (!client.userID && !isConnectingUser.current) {
      setUserConnected(false);
      isConnectingUser.current = true;
      connectUser();
    }
    return () => {
      const leaveChanel = async () => {
        try {
          await newChannel.stopWatching();
        } catch (error) {
          console.log(error, newChannel)
        }
      }
       leaveChanel();
    }

  }
    , [client, user, userToken]);
  return { userIsConnected, errorMessage, channel };
};


// const switchChannel = async (channel:Channel,client:Client,liveStreamID:string)  =>  {

//   await channel?.stopWatching();
//   const switchedChannel = client.channel("livestream", liveStreamID);
//   await switchedChannel.watch();
//   setChannel(switchedChannel  as Channel);

// }





const getRandomColor = (): string => {
  let textColor = ["red", "blue", "yellow"];
  var item = textColor[Math.floor(Math.random() * textColor.length)];
  return item;
};


export const useStreamChat = ({ LiveStream }: { LiveStream: string }) => {
  const client = useRef<Client>(StreamChat.getInstance("62mwbdkdfv8j"));

  const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoib2tlY2h1a3d1In0.7SNsBLTxoBlGX7KfXvP-dDAZ7pGJF-sO-NPZwXkYk4o";
  const user = {
    id: "okechukwu",
    username: "enigma",
    color: getRandomColor(),
  };

  const streami18n = useRef(
    new Streami18n({
      language: 'en',
    }),
  );
  const { userIsConnected, errorMessage, channel } = useConnectUser({
    user,
    userToken,
    client: client.current,
    liveStreamID: LiveStream
  });

  return {
    clientReady: userIsConnected,
    client: client.current,
    i18nInstance: streami18n.current,
    errorMessage,
    channel,
    user,
  };
};