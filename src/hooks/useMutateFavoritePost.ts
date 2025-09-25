import { UseMutationCustomOptions } from '@app/types/api/api';
import { useMutation } from '@tanstack/react-query';
import { updateFavoritePost } from '@app/api/post';
import { queryKeys } from '@app/constants/keys';
import { queryClient } from '@app/api/query-client';

function useMutateFavoritePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: updateFavoritePost,
    onSuccess: (updatedId) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, updatedId],
      });
    },
    ...mutationOptions,
  });
}

export default useMutateFavoritePost;
