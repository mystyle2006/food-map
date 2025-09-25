import { queryKeys } from '@app/constants/keys';
import { UseQueryCustomOptions } from '@app/types/api/api';
import { Post } from '@app/types/domains';
import { getPost } from '@app/api/post';
import { useQuery } from '@tanstack/react-query';

function useGetPost(id?: number, queryOptions?: UseQueryCustomOptions<Post>) {
  return useQuery({
    queryFn: () => getPost(Number(id)),
    queryKey: [queryKeys.POST, queryKeys.GET_POST, id],
    enabled: !!id,
    ...queryOptions,
  });
}

export default useGetPost;
