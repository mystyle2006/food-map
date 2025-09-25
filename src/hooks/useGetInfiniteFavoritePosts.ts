import { getFavoritePosts } from '@app/api/post';
import { queryKeys } from '@app/constants/keys';
import { ResponseError } from '@app/types/api/api';
import { Post } from '@app/types/domains';
import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';

export const useGetInfiniteFavoritePosts = (
  queryOptions?: UseInfiniteQueryOptions<
    Post[],
    ResponseError,
    InfiniteData<Post[], number>,
    QueryKey,
    number
  >,
) => {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getFavoritePosts(pageParam),
    queryKey: [
      queryKeys.POST,
      queryKeys.GET_POSTS,
      queryKeys.GET_FAVORITE_POSTS,
    ],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastPost = lastPage[lastPage.length - 1];
      return lastPost ? allPages.length + 1 : undefined;
    },
    ...queryOptions,
  });
};
