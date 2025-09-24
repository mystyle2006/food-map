import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Alert, StyleSheet, View } from 'react-native';
import DrawerButton from '@app/components/DrawerButton';
import { colors } from '@app/constants/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUserLocation } from '@app/hooks/useUserLocation';
import { numbers } from '@app/constants/numbers';
import usePermission from '@app/hooks/usePermission';
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from '@app/components/ui/toast';
import CustomMarker from '@app/components/CustomMarker';
import useMoveMapView from '@app/hooks/useMoveMapView';
import { MapIconButton } from '@app/components/MapIconButton';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MapStackParamList } from '@app/types/navigation';
import useGetMarkers from '@app/hooks/useGetMarkers';

type Navigation = StackNavigationProp<MapStackParamList>;

function MapHomeScreen() {
  const navigation = useNavigation<Navigation>();
  const toast = useToast();
  const inset = useSafeAreaInsets();
  const [selectLocation, setSelectLocation] = useState<LatLng | null>();

  const { userLocation, isUserLocationError } = useUserLocation();
  const { mapRef, moveMapView, handleChangeDelta } = useMoveMapView();
  const { data: markers = [] } = useGetMarkers();

  usePermission('LOCATION');

  const handlePressUserLocation = () => {
    if (isUserLocationError) {
      toast.show({
        placement: 'bottom',
        duration: 3000,
        containerStyle: {
          marginBottom: 30,
        },
        render: ({ id }) => {
          const uniqueToastId = 'toast-' + id;
          return (
            <Toast nativeID={uniqueToastId} action="info" variant="outline">
              <ToastTitle>Info</ToastTitle>
              <ToastDescription>
                Please allow location permission.
              </ToastDescription>
            </Toast>
          );
        },
      });
      return;
    }

    moveMapView(userLocation);
  };

  const handlePressMarker = (coordinate: LatLng) => {
    moveMapView(coordinate);
  };

  const handlePressAddPost = () => {
    if (!selectLocation) {
      Alert.alert(
        'Please select a location',
        'Press and hold the map to select a location.',
      );
      return;
    }

    navigation.navigate('AddLocation', {
      location: selectLocation,
    });
    setSelectLocation(null);
  };

  console.log(userLocation);

  return (
    <View className="" style={styles.container}>
      <DrawerButton
        className="absolute left-0 top-0 z-10 py-2.5 px-4 bg-primary-700 rounded-tr-[50px] rounded-br-[50px] shadow-md"
        style={{ top: inset.top + 10 }}
        color={colors.WHITE}
      />
      <MapView
        style={styles.map}
        ref={mapRef}
        onRegionChangeComplete={handleChangeDelta}
        onLongPress={({ nativeEvent }) =>
          setSelectLocation(nativeEvent.coordinate)
        }
        region={{
          ...userLocation,
          ...numbers.INITIAL_DELTA,
        }}
        provider={PROVIDER_GOOGLE}
      >
        {markers.map(({ id, color, score, ...coordinate }) => (
          <CustomMarker
            key={id}
            color={color}
            score={score}
            coordinate={coordinate}
            onPress={() => handlePressMarker(coordinate)}
          />
        ))}

        {selectLocation && <Marker coordinate={selectLocation} />}
      </MapView>
      <View className="absolute bottom-[30px] right-[20px] z-10">
        <MapIconButton onPress={handlePressAddPost} name="plus" />
        <MapIconButton
          onPress={handlePressUserLocation}
          name="location-crosshairs"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapHomeScreen;
