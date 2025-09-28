import axios from 'axios';
import { useEffect, useState } from 'react';
import Config from 'react-native-config';
import { LatLng } from 'react-native-maps';

type Meta = {
  total_count: number;
  pageable_count: number;
  is_end: boolean;
  same_name: {
    region: string[];
    keyword: string;
    selected_region: string;
  };
};

export type RegionInfo = {
  address_name: string;
  category_name: string;
  rating: number;
  id: string;
  place_name: string;
  road_address_name: string;
  x: string;
  y: string;
};

export type GooglePlaceType = {
  id: string;
  formattedAddress: string;
  displayName: {
    text: string;
  };
  primaryTypeDisplayName: {
    text: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
  rating: number;
};

type RegionResponse = {
  places: GooglePlaceType[];
};

function useSearchLocation(keyword: string, location: LatLng) {
  const [regionInfo, setRegionInfo] = useState<RegionInfo[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post<RegionResponse>(
          'https://places.googleapis.com/v1/places:searchText',
          {
            textQuery: keyword,
            languageCode: 'en',
          },
          {
            headers: {
              'X-Goog-Api-Key': Config.GOOGLE_MAP_API_KEY,
              'X-Goog-FieldMask': [
                'places.id',
                'places.formattedAddress',
                'places.displayName',
                'places.primaryTypeDisplayName',
                'places.location',
                'places.rating',
              ].join(','),
            },
          },
        );
        setRegionInfo(
          (data.places || []).map((place: GooglePlaceType) => ({
            address_name: place.formattedAddress,
            category_name: place.primaryTypeDisplayName.text,
            rating: place.rating,
            id: place.id,
            place_name: place.displayName.text,
            road_address_name: place.formattedAddress,
            x: place.location.longitude.toFixed(4),
            y: place.location.latitude.toFixed(4),
          })),
        );
      } catch {
        setRegionInfo([]);
      }
    })();
  }, [keyword, location]);

  return { regionInfo };
}

export default useSearchLocation;
