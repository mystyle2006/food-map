import axios from 'axios';
import Config from 'react-native-config';
import { LatLng } from 'react-native-maps';
import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { queryKeys } from '@app/constants/keys';

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
    text?: string;
  };
  primaryTypeDisplayName: {
    text?: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
  rating: number;
};

type RegionResponse = {
  places: GooglePlaceType[];
  nextPageToken: string | null;
};

const searchPlaces = async (
  keyword: string,
  pageToken?: string,
): Promise<RegionResponse> => {
  const { data } = await axios.post<RegionResponse>(
    'https://places.googleapis.com/v1/places:searchText',
    {
      textQuery: keyword,
      languageCode: 'en',
      ...(pageToken && { pageToken }),
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
          'nextPageToken',
        ].join(','),
      },
    },
  );

  return data;
};

function useSearchLocation(keyword: string, location: LatLng) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery<
    RegionResponse,
    Error,
    InfiniteData<RegionResponse, string | undefined>,
    QueryKey,
    string | undefined
  >({
    queryKey: [queryKeys.SEARCH_PLACES, keyword, location],
    queryFn: ({ pageParam }) => searchPlaces(keyword, pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextPageToken ?? undefined,
    enabled: Boolean(keyword),
  });

  const regionInfo: RegionInfo[] = (data?.pages || []).flatMap((page) =>
    (page.places || []).map((place: GooglePlaceType) => ({
      address_name: place.formattedAddress,
      category_name: place.primaryTypeDisplayName?.text || '',
      rating: place.rating,
      id: place.id,
      place_name: place.displayName?.text || '',
      road_address_name: place.formattedAddress,
      x: place.location.longitude.toFixed(4),
      y: place.location.latitude.toFixed(4),
    })),
  );

  return {
    regionInfo,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  };
}

export default useSearchLocation;
