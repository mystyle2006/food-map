import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { FeedStackParamList } from '@app/types/navigation';
import useGetPost from '@app/hooks/useGetPost';
import ImageCarousel from '@app/components/ImageCarousel';

type Props = StackScreenProps<FeedStackParamList, 'ImageZoom'>;

function ImageZoomScreen({ route }: Props) {
  const { id, index } = route.params;
  const { data: post } = useGetPost(id);

  return <ImageCarousel images={post?.imageUris ?? []} pressedIndex={index} />;
}

export default ImageZoomScreen;
