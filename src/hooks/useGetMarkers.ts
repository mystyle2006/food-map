import { getMarkers } from '@app/api/marker';
import { queryKeys } from '@app/constants/keys';
import { useQuery } from '@tanstack/react-query';
import { Marker } from '@app/types/domains';
import { UseQueryCustomOptions } from '@app/types/api/api';

function useGetMarkers(queryOptions?: UseQueryCustomOptions<Marker[]>) {
  return useQuery({
    queryFn: getMarkers,
    queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
    ...queryOptions,
  });
}

export default useGetMarkers;
