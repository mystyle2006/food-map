import { Post } from '@app/types/domains';
import { getDateWithSeparator } from '@app/utils/dates';
import React from 'react';
import { Pressable, Text, useWindowDimensions, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FeedStackParamList } from '@app/types/navigation';
import Config from 'react-native-config';
import FastImage from 'react-native-fast-image';

interface FeedItemProps {
  post: Post;
}

function FeedItem({ post }: FeedItemProps) {
  const navigation = useNavigation<StackNavigationProp<FeedStackParamList>>();
  const { width } = useWindowDimensions();
  const imageSize = width / 2 - 25;
  return (
    <Pressable
      className="flex-1 m-[5px] my-3"
      onPress={() => navigation.navigate('FeedDetail', { id: post.id })}
    >
      {post.imageUris.length > 0 && (
        <View style={{ width: imageSize, height: imageSize }}>
          <FastImage
            className="w-full h-full rounded"
            source={{
              uri: `${Config.STORAGE_ENDPOINT}/storage/v1/object/public/food-map-upload/${post.imageUris[0].uri}`,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
      )}
      {post.imageUris.length === 0 && (
        <View
          style={{ width: imageSize, height: imageSize }}
          className="justify-center items-center border border-gray-300 rounded"
        >
          <Text className="text-gray-500 text-[13px]">No Image</Text>
        </View>
      )}
      <View className="mt-[7px] gap-[2px]">
        <Text className="text-pink-700 font-semibold text-xs">
          {getDateWithSeparator(post.date, '/')}
        </Text>
        <Text className="text-black font-medium text-[13px]">{post.title}</Text>
        <Text className="text-gray-500 text-[13px]" numberOfLines={1}>
          {post.description}
        </Text>
      </View>
    </Pressable>
  );
}

export default FeedItem;
