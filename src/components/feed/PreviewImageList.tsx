import React from 'react';
import { Image, Platform, Pressable, ScrollView } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { baseUrls } from '@app/api/axios';
import { ImageUri } from '@app/types/domains';
import { colors } from '@app/constants/colors';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { FeedStackParamList } from '@app/types/navigation';

interface PreviewImageListProps {
  imageUris: ImageUri[];
  onDelete?: (uri: string) => void;
  deletable?: boolean;
}

function PreviewImageList({
  imageUris,
  onDelete,
  deletable = true,
}: PreviewImageListProps) {
  const navigation = useNavigation<NavigationProp<FeedStackParamList>>();
  const route = useRoute<RouteProp<FeedStackParamList>>();

  const handlePressImage = (index: number) => {
    navigation.navigate('ImageZoom', {
      id: route.params?.id,
      index,
    });
  };

  return (
    <ScrollView horizontal contentContainerClassName="gap-[15px] px-[15px]">
      {imageUris.map(({ uri }, index) => {
        console.log(uri);
        return (
          <Pressable
            key={uri}
            onPress={() => handlePressImage(index)}
            className="w-[70px] h-[70px]"
          >
            <Image
              className="w-full h-full"
              source={{
                uri: `https://qgilqdejucuouehqrfoi.supabase.co/storage/v1/object/public/food-map-upload/${uri}`,
              }}
              resizeMode="cover"
            />
            {deletable && (
              <Pressable
                className="absolute top-0 right-0 bg-black"
                onPress={() => onDelete?.(uri)}
              >
                <Ionicons name="close" size={16} color={colors.WHITE} />
              </Pressable>
            )}
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

export default PreviewImageList;
