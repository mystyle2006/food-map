import { useMutation } from '@tanstack/react-query';

import { createPost } from '@app/api/post';
import { UseMutationCustomOptions } from '@app/types/api/api';
import { queryKeys } from '@app/constants/keys';
import { queryClient } from '@app/api/query-client';
import { Marker } from '@app/types/domains';

function useMutateCreatePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      queryClient.setQueryData<Marker[]>(
        [queryKeys.MARKER, queryKeys.GET_MARKERS],
        (existingMarkers) => {
          const newMarker = {
            id: newPost.id,
            latitude: newPost.latitude,
            longitude: newPost.longitude,
            color: newPost.color,
            score: newPost.score,
          };

          return existingMarkers
            ? [...existingMarkers, newMarker]
            : [newMarker];
        },
      );
    },
    ...mutationOptions,
  });
}

export default useMutateCreatePost;
