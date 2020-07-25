import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Button, View, Alert, Text, Dimensions} from 'react-native';
import {createOpenLink} from 'react-native-open-maps';
import Geolocation from 'react-native-geolocation-service';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const MapPage = () => {
  const [lastPosition, setLastPosition] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [error, setError] = useState('');

  const end = 'Mal Graha Cijantung, Jakarta Timur, DKI Jakarta, Indonesia';
  const travelType = 'drive';
  const navigate_mode = 'navigate';

  useEffect(() => {

    const watchId = Geolocation.watchPosition(
      (position) => {
        setLastPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        console.log(position);
        setError('');
      },
      (err) => {
        Alert.alert('Error', JSON.stringify(err));
        setError(err);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 5,
        forceRequestLocation: true,
        useSignificantChanges: true,
        showLocationDialog: true,
      },
    );

    return () => Geolocation.clearWatch(watchId);
  }, []);

  return (
    <View>
      <Button
        color={'#bdc3c7'}
        onPress={createOpenLink({
          travelType,
          end,
          navigate_mode,
          provider: 'google',
        })}
        title="Directions (Here - Mall Cijantung)"
      />
      {error ? (
        <Text>Error retrieving current position</Text>
      ) : (
        <>
          <Text>Last Latitude: {lastPosition.latitude}</Text>
          <Text>Last Longitude: {lastPosition.longitude}</Text>
        </>
      )}
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -6.3476835,
          longitude: 106.8662345,
          latitudeDelta: 0.0005,
          longitudeDelta: 0.0005,
        }}
        mapPadding={{
          right: width / 10,
          bottom: height / 10,
          left: width / 10,
          top: height / 10,
        }}>
        <Marker coordinate={lastPosition} title={"I'm here"} />
      </MapView>
    </View>
  );
};

export default MapPage;

const styles = StyleSheet.create({
  map: {
    width: 250,
    height: 300,
  },
});
