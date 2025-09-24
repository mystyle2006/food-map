import useGetInfinitePosts from '@app/hooks/useGetInfinitePosts';
import React from 'react';
import { FlatList } from 'react-native';
import FeedItem from '@app/components/feed/FeedItem';

function FeedList() {
  const { data: posts } = useGetInfinitePosts();
  console.log(posts);
  return (
    <FlatList
      data={posts?.pages.flat()}
      renderItem={({ item }) => <FeedItem post={item} />}
      keyExtractor={(item) => String(item.id)}
      numColumns={2}
      contentContainerClassName="p-[15px]"
    />
  );
}

export default FeedList;
