import React from 'react';
import { Pressable } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { Text } from '@app/components/ui/text';

import { colors } from '@app/constants/colors';

interface ImageInputProps {
  onChange: () => void;
}

export const ImageInput = ({ onChange }: ImageInputProps) => {
  return (
    <Pressable
      className={
        'h-[70px] w-[70px] items-center justify-center gap-[5px] border-[1.5px] border-dotted border-gray-300 active:opacity-50'
      }
      onPress={onChange}
    >
      <Ionicons name="camera-outline" size={20} color={colors.GRAY_500} />
      <Text size="xs">Add photos</Text>
    </Pressable>
  );
};
