import useGetInfinitePosts from '@app/hooks/useGetInfinitePosts';
import React, { useState } from 'react';
import { FlatList } from 'react-native';
import FeedItem from '@app/components/feed/FeedItem';

function FeedList() {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfinitePosts();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  return (
    <FlatList
      data={posts?.pages?.flat() || []}
      renderItem={({ item }) => <FeedItem post={item} />}
      keyExtractor={(item) => String(item.id)}
      numColumns={2}
      contentContainerClassName="p-[15px]"
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      onRefresh={handleRefresh}
      refreshing={isRefreshing}
      scrollIndicatorInsets={{ right: 1 }}
      indicatorStyle="black"
    />
  );
}

export default FeedList;
