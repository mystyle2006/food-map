import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { colors } from '@app/constants/colors';

interface ScheduleProps {
  subTitle: string;
  title: string;
  onPress: () => void;
}

function Schedule({ subTitle, title, onPress }: ScheduleProps) {
  return (
    <Pressable className="flex-row" onPress={onPress}>
      <View
        className="w-[6px] h-[50px] mr-2 rounded-[20px]"
        style={{ backgroundColor: colors.PINK_700 }}
      />
      <View className="justify-evenly">
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="text-[13px]"
          style={{ color: colors.GRAY_500 }}
        >
          {subTitle}
        </Text>
        <Text
          className="text-[16px] font-semibold"
          style={{ color: colors.BLACK }}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  );
}

export default Schedule;
