import { UseMutationCustomOptions } from '@app/types/api/api';
import { useMutation } from '@tanstack/react-query';
import { deletePost } from '@app/api/post';
import { queryClient } from '@app/api/query-client';
import { queryKeys } from '@app/constants/keys';

export const useMutateDeletePost = (
  mutationOptions?: UseMutationCustomOptions,
) => {
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
      });
    },
    ...mutationOptions,
  });
};
