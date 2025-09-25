import React from 'react';
import {
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import useGetPost from '@app/hooks/useGetPost';
import { baseUrls } from '@app/api/axios';
import { colors } from '@app/constants/colors';
import { getDateWithSeparator } from '@app/utils/dates';
import { Avatar, AvatarImage } from '@app/components/ui/avatar';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainDrawerParamList } from '@app/types/navigation';

interface MarkerModalProps {
  markerId: number;
  isOpen: boolean;
  onClose: () => void;
}

export const MarkerBottomModal = ({
  markerId,
  isOpen,
  onClose,
}: MarkerModalProps) => {
  const { data: post, isPending, isError } = useGetPost(markerId);
  const { width } = useWindowDimensions();
  const navigation = useNavigation<StackNavigationProp<MainDrawerParamList>>();

  if (isPending || isError) {
    return <></>;
  }

  const handlePressModal = () => {
    navigation.navigate('Feed', {
      screen: 'FeedDetail',
      params: {
        id: post.id,
      },
      initial: false,
    });

    onClose();
  };

  return (
    <Modal visible={isOpen} transparent animationType="slide">
      <SafeAreaView className="flex-1 justify-end" onTouchEnd={onClose}>
        <Pressable
          className="bg-white m-2.5 border border-[#8E8E8E] rounded-2xl shadow-sm"
          onPress={handlePressModal}
        >
          <View className="p-5 w-full flex-row items-center justify-between">
            <View className="flex-row items-center justify-center">
              {post.imageUris.length > 0 && (
                <View className="rounded-full ">
                  <Avatar
                    size="lg"
                    className="bg-gray-200 border border-gray-300"
                  >
                    {post?.imageUris?.length > 0 && (
                      <AvatarImage
                        source={{
                          uri: `${
                            Platform.OS === 'ios'
                              ? baseUrls.ios
                              : baseUrls.android
                          }/${post.imageUris[0]?.uri}`,
                        }}
                      />
                    )}
                    {post.imageUris.length === 0 && (
                      <>
                        <Text className="text-xs text-gray-700">No</Text>
                        <Text className="text-xs text-gray-700">Photo</Text>
                      </>
                    )}
                  </Avatar>
                </View>
              )}
              <View className="ml-4 gap-[5px]" style={{ width: width - 180 }}>
                <View className="flex-row items-center gap-0.5">
                  <Ionicons
                    name="location-outline"
                    size={10}
                    color={colors.GRAY_500}
                  />
                  <Text
                    className="text-[#8E8E8E] text-[10px]"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {post.address}ㄴㅁㅇㅁㄴㅇㅁㄴㅇㄴㅇㅁㄴㅇㅁㄴㅇ
                  </Text>
                </View>
                <Text
                  className="text-black text-[15px] font-bold"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {post.title}
                </Text>
                <Text className="text-xs font-bold text-pink-700">
                  {getDateWithSeparator(post.date, '.')}
                </Text>
              </View>
            </View>

            <View className="w-10 h-10 items-end justify-center">
              <Ionicons name="chevron-forward" size={25} color={colors.BLACK} />
            </View>
          </View>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
};
