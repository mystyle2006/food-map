import axiosInstance from '@app/api/axios';
import { Marker } from '@app/types/domains';

async function getMarkers(): Promise<Marker[]> {
  const { data } = await axiosInstance.get('/markers');

  return data;
}

export { getMarkers };
