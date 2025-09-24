import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { colors } from '@app/constants/colors';
import CustomMarker from '@app/components/CustomMarker';

interface MarkerColorInputProps {
  color: string;
  onChangeColor: (value: string) => void;
}

function MarkerColorInput({ color, onChangeColor }: MarkerColorInputProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View className="flex-row gap-[20px]">
        {[
          colors.PINK_400,
          colors.BLUE_400,
          colors.YELLOW_400,
          colors.GREEN_400,
          colors.PURPLE_400,
        ].map((selectColor) => {
          return (
            <Pressable
              key={selectColor}
              className={`items-center justify-center w-[50px] pt-1 h-[50px] rounded-[5px] bg-gray-100  ${
                color === selectColor ? 'border border-primary-400' : ''
              }`}
              onPress={() => onChangeColor(selectColor)}
            >
              <CustomMarker color={selectColor} />
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}

export default MarkerColorInput;
