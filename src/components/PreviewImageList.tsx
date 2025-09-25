import React from 'react';
import { Image, Platform, Pressable, ScrollView } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { baseUrls } from '@app/api/axios';
import { ImageUri } from '@app/types/domains';
import { colors } from '@app/constants/colors';

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
  return (
    <ScrollView horizontal contentContainerClassName="gap-[15px] px-[15px]">
      {imageUris.map(({ uri }) => {
        return (
          <Pressable key={uri} className="w-[70px] h-[70px]">
            <Image
              className="w-full h-full"
              source={{
                uri: `${
                  Platform.OS === 'ios' ? baseUrls.ios : baseUrls.android
                }/${uri}`,
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
