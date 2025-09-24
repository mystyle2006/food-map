import { colors } from '@app/constants/colors.ts';
import { Pressable } from 'react-native';
import { ComponentProps } from 'react';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

type SolidIconName = Extract<
  ComponentProps<typeof FontAwesome6>,
  { iconStyle: 'solid' }
>['name'];

interface MapIconButtonProps {
  name: SolidIconName;
  onPress: () => void;
}

export const MapIconButton = ({ onPress, name }: MapIconButtonProps) => {
  return (
    <Pressable
      className="bg-primary-700 w-[45px] h-[45px] rounded-full flex items-center justify-center my-[5px] shadow-lg"
      onPress={onPress}
    >
      <FontAwesome6
        name={name}
        iconStyle="solid"
        size={25}
        color={colors.WHITE}
      />
    </Pressable>
  );
};
