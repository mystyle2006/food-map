import React from 'react';
import { Pressable, Text, useWindowDimensions, View } from 'react-native';

interface DateBoxProps {
  date: number;
  selectedDate: number;
  onPressDate: (date: number) => void;
  isToday: boolean;
  hasSchedule: boolean;
}

function DateBox({
  date,
  selectedDate,
  onPressDate,
  isToday,
  hasSchedule,
}: DateBoxProps) {
  const { width: deviceWidth } = useWindowDimensions();
  return (
    <Pressable
      style={{
        width: deviceWidth / 7,
        height: deviceWidth / 7,
        alignItems: 'center',
      }}
      onPress={() => onPressDate(date)}
    >
      {date > 0 && (
        <>
          <View
            className={`mt-[5px] items-center justify-center w-[28px] h-[28px] rounded-full ${
              selectedDate === date ? 'bg-black' : ''
            }`}
          >
            <Text
              className={`text-[17px] ${
                isToday ? 'text-[#C63B64] font-bold' : 'text-black'
              } ${selectedDate === date ? 'text-white font-bold' : ''}`}
            >
              {date}
            </Text>
          </View>
          {hasSchedule && (
            <View className="mt-[2px] w-[6px] h-[6px] rounded-full bg-[#8E8E8E]" />
          )}
        </>
      )}
    </Pressable>
  );
}

export default DateBox;
