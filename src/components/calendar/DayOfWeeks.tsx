import React from 'react';
import { Dimensions, Text, View } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

function DayOfWeeks() {
  return (
    <View className="flex-row mb-[5px]">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
        (dayOfWeek, index) => {
          return (
            <View
              key={index}
              className="items-center"
              style={{ width: deviceWidth / 7 }}
            >
              <Text
                className={`text-xs ${
                  dayOfWeek === 'Sat'
                    ? 'text-[#0D8AFF]'
                    : dayOfWeek === 'Sun'
                      ? 'text-[#FF5F5F]'
                      : 'text-black'
                }`}
              >
                {dayOfWeek}
              </Text>
            </View>
          );
        },
      )}
    </View>
  );
}

export default DayOfWeeks;
