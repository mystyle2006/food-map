import { useEffect, useState } from 'react';
import { LatLng } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

export function useUserLocation() {
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 0,
    longitude: 0,
  });
  const [isUserLocationError, setIsUserLocationError] = useState(false);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (info) => {
        console.log(info);
        setUserLocation(info.coords);
      },
      () => {
        setIsUserLocationError(true);
      },
      {
        enableHighAccuracy: true,
      },
    );
  }, []);

  console.log('>>>>', userLocation);

  return { userLocation, isUserLocationError };
}
