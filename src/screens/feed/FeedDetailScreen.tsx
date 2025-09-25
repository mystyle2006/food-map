import {
  Image,
  Platform,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { FeedStackParamList, MainDrawerParamList } from '@app/types/navigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useGetPost from '@app/hooks/useGetPost';
import Ionicons from '@react-native-vector-icons/ionicons';
import { colors } from '@app/constants/colors';
import { baseUrls } from '@app/api/axios';
import { getDateWithSeparator } from '@app/utils/dates';
import PreviewImageList from '@app/components/feed/PreviewImageList';
import { Button, ButtonText } from '@app/components/ui/button';
import React from 'react';
import { useLocationStore } from '@app/store/location';
import { useNavigation } from '@react-navigation/native';
import { useModal } from '@app/hooks/useModal';
import FeedDetailActionSheet from '@app/components/feed/FeedDetailActionSheet';
import useMutateFavoritePost from '@app/hooks/useMutateFavoritePost';

type Props = StackScreenProps<FeedStackParamList, 'FeedDetail'>;
type NavigationType = StackNavigationProp<MainDrawerParamList>;

function FeedDetailScreen({ route }: Props) {
  const { id } = route.params;
  const { width } = useWindowDimensions();
  const { setMoveLocation } = useLocationStore();
  const navigation = useNavigation<NavigationType>();
  const detailAction = useModal();
  const favoriteMutation = useMutateFavoritePost();

  const insets = useSafeAreaInsets();
  const { data: post, isPending, isError } = useGetPost(id);

  if (isPending || isError) {
    return <></>;
  }

  const handlePressLocation = () => {
    const { latitude, longitude } = post;
    setMoveLocation({ latitude, longitude });

    navigation.navigate('Map', {
      screen: 'MapHome',
    });
  };

  return (
    <>
      <View
        className="z-10 absolute flex-row justify-between items-center px-[15px] py-[10px] w-full"
        style={{ top: insets.top }}
      >
        <Ionicons
          name="chevron-back"
          size={24}
          color={colors.WHITE}
          onPress={() => navigation.goBack()}
          style={{
            textShadowColor: 'rgba(0, 0, 0, 0.2)',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 2,
          }}
        />
        <Ionicons
          name="ellipsis-vertical"
          size={20}
          color={colors.WHITE}
          onPress={() => detailAction.show()}
          style={{
            textShadowColor: 'rgba(0, 0, 0, 0.2)',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 2,
          }}
        />
      </View>
      <ScrollView
        contentContainerStyle={[{ paddingBottom: insets.bottom + 100 }]}
      >
        <View style={{ width, height: width }}>
          {post.imageUris.length > 0 && (
            <Image
              className="w-full h-full"
              source={{
                uri: `${Platform.OS === 'ios' ? baseUrls.ios : baseUrls.android}/${post.imageUris[0].uri}`,
              }}
              resizeMode="cover"
            />
          )}
          {post.imageUris.length === 0 && (
            <View
              className="h-full justify-center items-center bg-gray-200 border border-gray-200"
              style={{ height: width }}
            >
              <Text>No Image</Text>
            </View>
          )}
        </View>

        <View className="p-5 bg-white mb-[10px]">
          <View className="gap-[5px] my-[10px] flex-row items-center">
            <Ionicons name="location" size={10} color={colors.GRAY_500} />
            <Text
              className="text-gray-500 text-xs"
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {post.address}
            </Text>
          </View>
          <Text className="text-[22px] font-bold text-black">{post.title}</Text>
          <View className="my-5 gap-2">
            <View className="flex-row">
              <View className="flex-1 flex-row items-center gap-[5px]">
                <Text className="text-black">Date</Text>
                <Text className="text-pink-700">
                  {getDateWithSeparator(post.date, '.')}
                </Text>
              </View>
              <View className="flex-1 flex-row items-center gap-[5px]">
                <Text className="text-black">Rating</Text>
                <Text className="text-pink-700">{post.score}</Text>
              </View>
            </View>
            <View className="flex-row">
              <View className="flex-1 flex-row items-center gap-[5px]">
                <Text className="text-black">Marker Color</Text>
                <View
                  className="w-[10px] h-[10px] rounded-[10px]"
                  style={{ backgroundColor: post.color }}
                />
              </View>
            </View>
          </View>
          <Text className="text-black leading-[25px] text-base">
            {post.description}
          </Text>
        </View>
        <View className="h-[10px] bg-gray-100" />
        {post.imageUris.length > 0 && (
          <View className="py-[15px] bg-white mb-[10px]">
            <PreviewImageList imageUris={post.imageUris} deletable={false} />
          </View>
        )}
      </ScrollView>

      <View className="absolute bottom-0 w-full items-center flex-row justify-end py-[10px] px-5 bg-white border-t border-gray-200 gap-[5px]">
        <Button size="sm" onPress={() => favoriteMutation.mutate(post.id)}>
          <Ionicons
            name="star"
            size={18}
            color={post.isFavorite ? colors.RED_500 : colors.WHITE}
          />
        </Button>
        <Button size="sm" onPress={handlePressLocation}>
          <ButtonText>Go to Location</ButtonText>
        </Button>
      </View>

      <FeedDetailActionSheet
        id={post.id}
        isOpen={detailAction.isVisible}
        onClose={detailAction.hide}
      />
    </>
  );
}

export default FeedDetailScreen;
