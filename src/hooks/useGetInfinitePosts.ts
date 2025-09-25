import { queryKeys } from '@app/constants/keys';
import { Post } from '@app/types/domains';
import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import { ResponseError } from '@app/types/api/api';
import { getPosts } from '@app/api/post';

function useGetInfinitePosts(
  queryOptions?: UseInfiniteQueryOptions<
    Post[],
    ResponseError,
    InfiniteData<Post[], number>,
    QueryKey,
    number
  >,
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => {
      return getPosts(pageParam);
    },
    queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastPost = lastPage[lastPage.length - 1];
      return lastPost ? allPages.length + 1 : undefined;
    },
    ...queryOptions,
  });
}

export default useGetInfinitePosts;
