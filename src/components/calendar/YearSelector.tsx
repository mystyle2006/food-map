import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

import { colors } from '@app/constants/colors';
import { numbers } from '@app/constants/numbers';

interface YearSelectorProps {
  isVisible: boolean;
  currentYear: number;
  onChangeYear: (year: number) => void;
  hide: () => void;
}

function YearSelector({
  isVisible,
  currentYear,
  onChangeYear,
  hide,
}: YearSelectorProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const yearIndex = currentYear - numbers.MIN_CALENDAR_YEAR;
    const currentRow = Math.floor(
      yearIndex / numbers.CALENDAR_YEAR_SELECTOR_COLUMN,
    );
    const scrollToY = currentRow * 50;

    setScrollY(scrollToY);
  }, [isVisible, currentYear]);

  return (
    <>
      {isVisible && (
        <View className="absolute w-full">
          <View className="items-center bg-white">
            <FlatList
              className="max-h-[200px] bg-white"
              showsVerticalScrollIndicator={false}
              contentOffset={{ x: 0, y: scrollY }}
              initialNumToRender={currentYear - numbers.MIN_CALENDAR_YEAR}
              data={Array.from(
                {
                  length:
                    numbers.MAX_CALENDAR_YEAR - numbers.MIN_CALENDAR_YEAR + 1,
                },
                (_, index) => ({
                  id: index,
                  num: index + numbers.MIN_CALENDAR_YEAR,
                }),
              )}
              renderItem={({ item }) => (
                <Pressable
                  key={item.num}
                  onPress={() => onChangeYear(item.num)}
                  className={`w-[80px] h-[40px] p-[10px] m-[5px] border border-[#8E8E8E] rounded-[2px] items-center justify-center ${currentYear === item.num ? 'bg-[#C63B64] border-[#C63B64]' : ''}`}
                >
                  <Text
                    className={`text-base font-medium text-[#575757] ${currentYear === item.num ? 'text-white font-semibold' : ''}`}
                  >
                    {item.num}
                  </Text>
                </Pressable>
              )}
              keyExtractor={(item) => String(item.num)}
              numColumns={numbers.CALENDAR_YEAR_SELECTOR_COLUMN}
            />
          </View>
          <Pressable
            className="flex-1 flex-row bg-white p-[15px] items-center justify-center border-t border-b border-[#8E8E8E]"
            onPress={hide}
          >
            <Text className="text-black text-base font-semibold">Close</Text>
            <Ionicons name="chevron-up" size={20} color={colors.BLACK} />
          </Pressable>
        </View>
      )}
    </>
  );
}

export default YearSelector;
