import React, {useMemo} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {useEffect} from 'react';
import {Alert, Button, StyleSheet, useWindowDimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MapView, {Marker} from 'react-native-maps';
import {NavigationParamsList} from '../common/types';
import {useAppContext} from '../common/AppContext';
import {useLiveLocationContext} from '../common/LiveLocationContext';

type MapDetailScreenProps = StackScreenProps<NavigationParamsList, 'MapDetail'>;

const MapDetailScreen: React.FC<MapDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const {channel} = useAppContext();
  if (!channel) {
    throw new Error('MapDetailScreen - Channel is not defined');
  }
  const {isWatching, stopLiveLocation} = useLiveLocationContext();
  const {width, height} = useWindowDimensions();
  const aspect_ratio = width / height;

  const {messageId, latitude, longitude, ended_at} = route.params;
  const showStopSharingButton = !ended_at && isWatching(messageId);

  const endedAtDate = ended_at ? new Date(ended_at) : null;
  const formattedEndedAt = endedAtDate ? endedAtDate.toLocaleString() : '';

  const region = useMemo(() => {
    const latitudeDelta = 0.1;
    const longitudeDelta = latitudeDelta * aspect_ratio;
    return {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    };
  }, [aspect_ratio, latitude, longitude]);

  useEffect(() => {
    const listeners = [
      channel.on('message.updated', event => {
        if (
          event.message?.id === messageId &&
          event.message.attachments?.[0]?.type === 'location'
        ) {
          const attachment = event.message.attachments[0];
          if (attachment) {
            navigation.setParams({
              latitude: attachment.latitude,
              longitude: attachment.longitude,
              ended_at: attachment.ended_at,
            });
          }
        }
      }),
      channel.on('message.deleted', event => {
        if (event.message?.id === messageId) {
          Alert.alert(
            'Message deleted',
            'The live location message has been deleted',
          );
          navigation.goBack();
        }
      }),
    ];

    return () => listeners.forEach(l => l.unsubscribe());
  }, [channel, messageId, navigation]);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <MapView region={region} style={styles.container}>
        <Marker
          coordinate={{
            latitude,
            longitude,
          }}
        />
      </MapView>
      {showStopSharingButton && (
        <Button
          title="Stop sharing"
          onPress={() => {
            stopLiveLocation(messageId);
          }}
        />
      )}
      {ended_at && (
        <Button title={`Ended at: ${formattedEndedAt}`} disabled={true} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapDetailScreen;
