import Calendar from '@app/components/Calendar';
import React, { useEffect, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { getMonthYearDetails, getNewMonthYear } from '@app/utils/dates';
import { colors } from '@app/constants/colors';
import { useNavigation } from '@react-navigation/native';
import Schedule from '@app/components/calendar/Schedule';
import useGetCalendarPosts from '@app/hooks/useGetCalendarPosts';
import { MainDrawerParamList } from '@app/types/navigation';
import { StackNavigationProp } from '@react-navigation/stack';

function CalendarScreen() {
  const navigation = useNavigation<StackNavigationProp<MainDrawerParamList>>();
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState(currentMonthYear);
  const [selectedDate, setSelectedDate] = useState(0);
  const { data: posts } = useGetCalendarPosts(monthYear.year, monthYear.month);

  const moveToToday = () => {
    setSelectedDate(new Date().getDate());
    setMonthYear(getMonthYearDetails(new Date()));
  };

  const handleUpdateMonth = (increment: number) => {
    setSelectedDate(0);
    setMonthYear((prev) => getNewMonthYear(prev, increment));
  };

  const handlePressSchedule = (postId: number) => {
    navigation.navigate('Feed', {
      screen: 'FeedDetail',
      params: { id: postId },
      initial: false,
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={moveToToday} style={{ paddingHorizontal: 10 }}>
          <Text style={{ color: colors.PINK_700, fontWeight: 'bold' }}>
            Today
          </Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        monthYear={monthYear}
        schedules={posts ?? {}}
        onChangeMonth={handleUpdateMonth}
        selectedDate={selectedDate}
        onPressDate={(date: number) => setSelectedDate(date)}
      />
      <ScrollView
        style={styles.scheduleContainer}
        contentContainerStyle={{ gap: 20 }}
      >
        {posts?.[selectedDate]?.map((post) => (
          <Schedule
            key={post.id}
            subTitle={post.address}
            title={post.title}
            onPress={() => handlePressSchedule(post.id)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  scheduleContainer: {
    padding: 20,
    backgroundColor: colors.WHITE,
  },
});

export default CalendarScreen;
