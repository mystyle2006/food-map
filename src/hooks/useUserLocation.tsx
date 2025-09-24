import { useEffect, useState } from 'react';
import { LatLng } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import useAppState from '@app/hooks/useAppState';

export function useUserLocation() {
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 0,
    longitude: 0,
  });
  const [isUserLocationError, setIsUserLocationError] = useState(false);
  const { isComeback } = useAppState();
  console.info('INFO: useAppState.isComeback', isComeback);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (info) => {
        setUserLocation(info.coords);
        setIsUserLocationError(false);
      },
      (error) => {
        console.error('ERROR:useUserLocation', error);
        setIsUserLocationError(true);
      },
      {
        enableHighAccuracy: true,
      },
    );
  };

  useEffect(() => {
    if (!isComeback) {
      return;
    }

    getCurrentLocation();
  }, [isComeback]);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return { userLocation, isUserLocationError };
}
