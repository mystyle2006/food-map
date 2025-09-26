import React from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { colors } from '@app/constants/colors';
import { getMonthText, isSameAsCurrentDate, MonthYear } from '@app/utils/dates';
import DayOfWeeks from '@app/components/calendar/DayOfWeeks';
import DateBox from '@app/components/calendar/DateBox';
import { ResponseCalendarPost } from '@app/api/post';
import { useModal } from '@app/hooks/useModal';
import YearSelector from '@app/components/calendar/YearSelector';

interface CalendarProps {
  monthYear: MonthYear;
  onChangeMonth: (increment: number) => void;
  selectedDate: number;
  onPressDate: (date: number) => void;
  schedules: ResponseCalendarPost;
}

function Calendar({
  monthYear,
  onChangeMonth,
  selectedDate,
  onPressDate,
  schedules,
}: CalendarProps) {
  const { month, year, firstDOW, lastDate } = monthYear;

  const yearSelector = useModal();

  const handleChangeYear = (selectYear: number) => {
    onChangeMonth((selectYear - year) * 12);
    yearSelector.hide();
  };

  return (
    <>
      <View className="flex-row items-center justify-between mx-[25px] my-4">
        <Pressable className="p-[10px]" onPress={() => onChangeMonth(-1)}>
          <Ionicons name="arrow-back" size={25} color={colors.BLACK} />
        </Pressable>
        <Pressable
          className="flex-row items-center gap-[3px] p-[10px]"
          onPress={yearSelector.show}
        >
          <Text className="text-[18px] font-medium text-black">
            {getMonthText(month)} {year}
          </Text>
          <Ionicons
            name="chevron-down-outline"
            size={18}
            color={colors.GRAY_500}
          />
        </Pressable>
        <Pressable className="p-[10px]" onPress={() => onChangeMonth(1)}>
          <Ionicons name="arrow-forward" size={25} color={colors.BLACK} />
        </Pressable>
      </View>

      <DayOfWeeks />
      <View className="bg-[#F8F8F8] border-b border-[#D8D8D8]">
        <FlatList
          data={Array.from({ length: lastDate + firstDOW }, (_, index) => ({
            id: index,
            date: index - firstDOW + 1,
          }))}
          renderItem={({ item }) => (
            <DateBox
              date={item.date}
              isToday={isSameAsCurrentDate(year, month, item.date)}
              selectedDate={selectedDate}
              onPressDate={onPressDate}
              hasSchedule={Boolean(schedules[item.date])}
            />
          )}
          keyExtractor={(item) => String(item.id)}
          numColumns={7}
        />
      </View>

      <YearSelector
        isVisible={yearSelector.isVisible}
        currentYear={year}
        onChangeYear={handleChangeYear}
        hide={yearSelector.hide}
      />
    </>
  );
}

export default Calendar;
