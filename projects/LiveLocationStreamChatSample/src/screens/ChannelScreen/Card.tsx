import React, {useMemo} from 'react';
import {Button, StyleSheet, useWindowDimensions} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {
  Channel,
  Card as DefaultCard,
  useMessageContext,
  useMessageOverlayContext,
  useOverlayContext,
} from 'stream-chat-react-native';
import {useLiveLocationContext} from '../../common/LiveLocationContext';
import {StreamChatGenerics} from '../../common/types';

const MapCard = ({
  latitude,
  longitude,
  ended_at,
}: {
  latitude: number;
  longitude: number;
  ended_at?: string;
}) => {
  const {width, height} = useWindowDimensions();
  const aspect_ratio = width / height;
  const {stopLiveLocation} = useLiveLocationContext();

  const {isMyMessage, message} = useMessageContext();
  const {data} = useMessageOverlayContext();
  const {overlay} = useOverlayContext();
  const overlayId = data?.message?.id;
  // is this message shown on overlay? If yes, then don't show the button
  const isOverlayOpen = overlay === 'message' && overlayId === message.id;
  const showStopSharingButton = !ended_at && isMyMessage && !isOverlayOpen;

  // Convert ISO date string to Date object
  const endedAtDate = ended_at ? new Date(ended_at) : null;

  // Format the date to a readable string
  const formattedEndedAt = endedAtDate ? endedAtDate.toLocaleString() : '';

  // this is to compute the zoom level and centre for the map view
  const region = useMemo(() => {
    const latitudeDelta = 0.02;
    const longitudeDelta = latitudeDelta * aspect_ratio;

    // For reference, check -
    // https://github.com/react-native-maps/react-native-maps/blob/master/example/src/examples/DisplayLatLng.tsx
    return {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    };
  }, [aspect_ratio, latitude, longitude]);

  return (
    <>
      <MapView
        region={region}
        pitchEnabled={false}
        rotateEnabled={false}
        scrollEnabled={false}
        zoomTapEnabled={false}
        zoomEnabled={false}
        toolbarEnabled={false}
        style={styles.mapView}>
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
            stopLiveLocation(message.id);
          }}
        />
      )}
      {ended_at && (
        <Button title={`Ended at: ${formattedEndedAt}`} disabled={true} />
      )}
      {!ended_at && !showStopSharingButton && (
        <Button title={'Live location'} disabled={true} />
      )}
    </>
  );
};

const Card: NonNullable<
  React.ComponentProps<typeof Channel>['Card']
> = props => {
  const {type, ...otherProperties} = props;

  if (type === 'location') {
    // @ts-ignore
    return <MapCard {...otherProperties} />;
  }

  return <DefaultCard {...props} />;
};

export const isAttachmentEqualHandler: NonNullable<
  React.ComponentProps<typeof Channel<StreamChatGenerics>>['isAttachmentEqual']
> = (prevAttachment, nextAttachment) => {
  if (
    prevAttachment.type === 'location' &&
    nextAttachment.type === 'location'
  ) {
    return (
      prevAttachment.latitude === nextAttachment.latitude &&
      prevAttachment.longitude === nextAttachment.longitude &&
      prevAttachment.ended_at === nextAttachment.ended_at
    );
  }
  return true;
};

const styles = StyleSheet.create({
  mapView: {
    height: 250,
    width: 250,
  },
});

export default Card;
