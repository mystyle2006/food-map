import React, { useState } from 'react';
import {
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  useWindowDimensions,
  View,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { ImageUri } from '@app/types/domains';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { baseUrls } from '@app/api/axios';
import { colors } from '@app/constants/colors';

interface ImageCarouselProps {
  images: ImageUri[];
  pressedIndex?: number;
}

function ImageCarousel({ images, pressedIndex = 0 }: ImageCarouselProps) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { width: deviceWidth } = useWindowDimensions();

  const [initialIndex, setInitialIndex] = useState(pressedIndex);
  const [page, setPage] = useState(pressedIndex);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newPage = Math.round(e.nativeEvent.contentOffset.x / deviceWidth);

    setPage(newPage);
  };

  return (
    <View className="flex-1 items-center bg-black">
      <Pressable
        className="absolute left-5 z-10 h-10 w-10 rounded-full items-center justify-center"
        style={{ marginTop: insets.top + 10 }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={30} color={colors.WHITE} />
      </Pressable>

      <FlatList
        data={images}
        renderItem={({ item }) => (
          <View style={{ width: deviceWidth }}>
            <Image
              className="w-full h-full"
              source={{
                uri: `${
                  Platform.OS === 'ios' ? baseUrls.ios : baseUrls.android
                }/${item.uri}`,
              }}
              resizeMode="contain"
            />
          </View>
        )}
        onScroll={handleScroll}
        keyExtractor={(item) => String(item.id)}
        horizontal
        pagingEnabled
        initialScrollIndex={initialIndex}
        onScrollToIndexFailed={() => {
          setInitialIndex(pressedIndex);
        }}
      />

      <View
        className="flex-row items-center absolute"
        style={{ bottom: insets.bottom + 10 }}
      >
        {Array.from({ length: images.length }, (_, index) => (
          <View
            key={index}
            className={`m-1 w-2 h-2 rounded-full ${
              index === page ? 'bg-red-500' : 'bg-gray-200'
            }`}
          />
        ))}
      </View>
    </View>
  );
}

export default ImageCarousel;
