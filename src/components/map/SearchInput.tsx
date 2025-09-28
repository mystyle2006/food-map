import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

import { colors } from '@app/constants/colors';

interface SearchInputProps extends TextInputProps {
  onSubmit: () => void;
}

function SearchInput({ onSubmit, ...props }: SearchInputProps) {
  return (
    <View className="flex-row items-center border border-[#E7E7E7] p-2.5 rounded">
      <TextInput
        className="flex-1 py-0 pl-0 text-black"
        autoCapitalize="none"
        placeholderTextColor={colors.GRAY_500}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
        {...props}
      />
      <FontAwesome6
        name="magnifying-glass"
        iconStyle="solid"
        size={20}
        color={colors.BLACK}
        onPress={onSubmit}
      />
    </View>
  );
}

export default SearchInput;
