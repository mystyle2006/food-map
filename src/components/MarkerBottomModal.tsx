import { baseUrls } from '@app/api/axios';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from '@app/components/ui/actionsheet';
import useGetPost from '@app/hooks/useGetPost';
import { Image, Platform, View } from 'react-native';
import { HStack } from '@app/components/ui/hstack';
import { Text } from '@app/components/ui/text';
import { Avatar, AvatarImage } from '@app/components/ui/avatar';
import Ionicons from '@react-native-vector-icons/ionicons';
import { colors } from '@app/constants/colors';
import { getDateWithSeparator } from '@app/utils/dates';
import { Box } from '@app/components/ui/box';

interface MarkerBottomModalProps {
  markerId: number;
  isOpen: boolean;
  onClose: () => void;
}

export const MarkerBottomModal = ({
  isOpen,
  onClose,
  markerId,
}: MarkerBottomModalProps) => {
  const { data: post, isPending, isError } = useGetPost(markerId);

  console.log(isPending, isError);

  if (isPending || isError) {
    return <></>;
  }

  console.log(post);

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <ActionsheetBackdrop />
      <ActionsheetContent>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <HStack space="md" className="py-3">
          <Box>
            {post.imageUris.length > 0 && (
              <View>
                <Image
                  source={{
                    uri: `${
                      Platform.OS === 'ios' ? baseUrls.ios : baseUrls.android
                    }/${post.imageUris[0]?.uri}`,
                  }}
                  resizeMode="cover"
                />
                <Avatar size="xl">
                  <AvatarImage
                    source={{
                      uri: `${
                        Platform.OS === 'ios' ? baseUrls.ios : baseUrls.android
                      }/${post.imageUris[0]?.uri}`,
                    }}
                  />
                </Avatar>
              </View>
            )}
          </Box>
          <Box className="justify-center">
            <View className="gap-1">
              <View className="flex-row items-center w-full">
                <Ionicons
                  className="justify-center"
                  name="location-outline"
                  size={10}
                  color={colors.GRAY_500}
                />
                <Text className="text-gray-500 text-[10px]">
                  {post.address}
                </Text>
              </View>
              <Text className="text-black text-[15px] font-bold">
                {post.title}
              </Text>
              <Text className="text-[12px] text-primary-500">
                {getDateWithSeparator(post.date, '.')}
              </Text>
            </View>
          </Box>
          <Box className="justify-center">
            <Ionicons name="chevron-forward" size={23} color={colors.BLACK} />
          </Box>
        </HStack>
      </ActionsheetContent>
    </Actionsheet>
  );
};
