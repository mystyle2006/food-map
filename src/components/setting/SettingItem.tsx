import { colors } from '@app/constants/colors';
import React from 'react';
import { Pressable, PressableProps, StyleSheet, Text } from 'react-native';

interface SettingItemProps extends PressableProps {
  title: string;
  color?: string;
}

function SettingItem({ title, color, ...props }: SettingItemProps) {
  return (
    <Pressable
      {...props}
      className={'flex w-full bg-white p-[15px] border-b border-gray-100'}
    >
      <Text style={[styles.titleText, { color: color ?? colors.BLACK }]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressedContainer: {
    backgroundColor: colors.GRAY_200,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.BLACK,
  },
});

export default SettingItem;
