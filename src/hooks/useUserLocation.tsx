import { useEffect, useState } from 'react';
import { LatLng } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import useAppState from '@app/hooks/useAppState.tsx';

export function useUserLocation() {
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 0,
    longitude: 0,
  });
  const [isUserLocationError, setIsUserLocationError] = useState(false);
  const { isComeback } = useAppState();

  useEffect(() => {
    if (!isComeback) {
      return;
    }

    Geolocation.getCurrentPosition(
      (info) => {
        setUserLocation(info.coords);
        setIsUserLocationError(false);
      },
      (error) => {
        setIsUserLocationError(true);
      },
      {
        enableHighAccuracy: true,
      },
    );
  }, [isComeback]);

  return { userLocation, isUserLocationError };
}
