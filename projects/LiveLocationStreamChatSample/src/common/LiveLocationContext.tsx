import React, {createContext, useContext} from 'react';
import {useChatContext} from 'stream-chat-react-native';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';

Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'always',
  enableBackgroundLocationUpdates: true,
});

interface LiveLocationContextValue {
  startLiveLocation: (messageId: string) => void;
  stopLiveLocation: (messageId: string) => void;
  isWatching: (messageId: string) => boolean;
}

const LiveLocationContext = createContext<LiveLocationContextValue>({
  startLiveLocation: () => {},
  stopLiveLocation: () => {},
  isWatching: () => false,
});

export const useLiveLocationContext = () => {
  return useContext(LiveLocationContext);
};

// a map of message IDs to live location watch IDs
const messageIdToLiveWatchMap = new Map<string, number>();

const isWatching = (id: string) => {
  return messageIdToLiveWatchMap.has(id);
};

export const LiveLocationContextProvider = (
  props: React.PropsWithChildren<{}>,
) => {
  const {client} = useChatContext();

  const lastLocationRef = React.useRef<GeolocationResponse>();

  const startLiveLocation = React.useCallback(
    (id: string) => {
      const watchId = Geolocation.watchPosition(
        position => {
          client.updateMessage({
            id,
            attachments: [
              {
                type: 'location',
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              },
            ],
          });
          lastLocationRef.current = position;
        },
        error => {
          console.error('watchPosition', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
          interval: 5000, // android only
        },
      );
      messageIdToLiveWatchMap.set(id, watchId);
    },
    [client],
  );

  const stopLiveLocation = React.useCallback(
    (id: string) => {
      const watchId = messageIdToLiveWatchMap.get(id);
      if (watchId !== undefined) {
        messageIdToLiveWatchMap.delete(id);
        Geolocation.clearWatch(watchId);
        if (lastLocationRef.current) {
          client.updateMessage({
            id,
            attachments: [
              {
                type: 'location',
                latitude: lastLocationRef.current.coords.latitude,
                longitude: lastLocationRef.current.coords.longitude,
                ended_at: new Date().toISOString(),
              },
            ],
          });
        }
      }
    },
    [client],
  );

  const contextValue: LiveLocationContextValue = {
    startLiveLocation,
    stopLiveLocation,
    isWatching,
  };

  return (
    <LiveLocationContext.Provider value={contextValue}>
      {props.children}
    </LiveLocationContext.Provider>
  );
};
