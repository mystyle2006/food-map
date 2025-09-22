import MapView, { LatLng, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, Pressable } from 'react-native';
import DrawerButton from '@app/components/DrawerButton.tsx';
import { colors } from '@app/constants/colors.ts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRef } from 'react';
import { useUserLocation } from '@app/hooks/useUserLocation';
import { numbers } from '@app/constants/numbers.ts';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import usePermission from '@app/hooks/usePermission.tsx';

function MapHomeScreen() {
  const inset = useSafeAreaInsets();

  const mapRef = useRef<MapView | null>(null);
  const { userLocation, isUserLocationError } = useUserLocation();

  usePermission('LOCATION');

  const moveMapView = (coordinate: LatLng) => {
    mapRef.current?.animateToRegion({
      ...coordinate,
      ...numbers.INITIAL_DELTA,
    });
  };

  const handlePressUserLocation = () => {
    if (isUserLocationError) {
      // 위치 권한을 허용해주세요.
      return;
    }

    moveMapView(userLocation);
  };

  return (
    <View className="h-full w-full" style={styles.container}>
      <DrawerButton
        className="absolute left-0 top-0 z-10 py-2.5 px-4 bg-primary-700 rounded-tr-[50px] rounded-br-[50px] shadow-md"
        style={{ top: inset.top + 10 }}
        color={colors.WHITE}
      />
      <MapView
        style={styles.map}
        ref={mapRef}
        region={{
          ...userLocation,
          ...numbers.INITIAL_DELTA,
        }}
        provider={PROVIDER_GOOGLE}
      />
      <View className="absolute bottom-[30px] right-[20px] z-10">
        <Pressable
          className="bg-primary-700 w-[45px] h-[45px] rounded-full flex items-center justify-center my-[5px] shadow-lg"
          onPress={handlePressUserLocation}
        >
          <FontAwesome6
            name="location-crosshairs"
            iconStyle="solid"
            size={25}
            color={colors.WHITE}
          />
        </Pressable>
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
