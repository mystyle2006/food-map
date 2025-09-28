import React, { useState } from 'react';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
} from '@app/components/ui/actionsheet';
import { Pressable, Text } from 'react-native';
import { View } from 'react-native';
import { Box } from '@app/components/ui/box';
import { VStack } from '@app/components/ui/vstack';
import { HStack } from '@app/components/ui/hstack';
import Ionicons from '@react-native-vector-icons/ionicons';
import { Divider } from '@app/components/ui/divider';
import { colors } from '@app/constants/colors';
import { useFilterStore } from '@app/store/filter';

interface MarkerFilterActionSheetProps {
  isVisible: boolean;
  hideAction: () => void;
}

function MarkerFilterActionSheet({
  isVisible,
  hideAction,
}: MarkerFilterActionSheetProps) {
  const [filterCondition, setFilterCondition] = useState('color');
  const { filters, setFilters } = useFilterStore();

  const handleFilter = (name: string) => {
    setFilters({ ...filters, [name]: !filters[name] });
  };

  return (
    <Actionsheet isOpen={isVisible} onClose={hideAction}>
      <ActionsheetBackdrop />
      <ActionsheetContent>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <VStack space="md" reversed={false} className="w-full">
          <Box className="p-3 w-full items-center">
            <Text>Filtering</Text>
          </Box>
          <Divider />
          <HStack space="md" className="flex justify-between w-full ">
            <Pressable
              className="text-center flex-1 items-center flex-row gap-1 justify-center"
              onPress={() => setFilterCondition('color')}
            >
              <Text>Color</Text>
              <Ionicons name="chevron-down" size={16} />
            </Pressable>
            <Pressable
              className="text-center flex-1 items-center flex-row gap-1 justify-center"
              onPress={() => setFilterCondition('rating')}
            >
              <Text>Rating</Text>
              <Ionicons name="chevron-down" size={16} />
            </Pressable>
          </HStack>
          <Divider />
          {filterCondition === 'color' &&
            [
              colors.PINK_400,
              colors.YELLOW_400,
              colors.GREEN_400,
              colors.BLUE_400,
              colors.PURPLE_400,
            ].map((color) => (
              <Pressable
                className="flex-row items-center gap-3 px-6"
                key={color}
                onPress={() => handleFilter(color)}
              >
                <Ionicons
                  size={22}
                  color={colors.BLUE_500}
                  name={
                    filters[color]
                      ? 'checkmark-circle'
                      : 'checkmark-circle-outline'
                  }
                />
                <View
                  className="w-[20px] h-[20px] rounded-[50%]"
                  style={{ backgroundColor: color }}
                />
              </Pressable>
            ))}

          {filterCondition === 'rating' &&
            ['1', '2', '3', '4', '5'].map((rating) => (
              <Pressable
                className="flex-row items-center gap-3 px-6"
                key={rating}
                onPress={() => handleFilter(rating)}
              >
                <Ionicons
                  size={22}
                  color={colors.BLUE_500}
                  name={
                    filters[rating]
                      ? 'checkmark-circle'
                      : 'checkmark-circle-outline'
                  }
                />
                <Text>{rating}</Text>
              </Pressable>
            ))}
          <Divider />
        </VStack>
        <ActionsheetItem onPress={hideAction} className="w-full justify-center">
          <ActionsheetItemText
            className="text-primary-500"
            onPress={hideAction}
          >
            Save
          </ActionsheetItemText>
        </ActionsheetItem>
      </ActionsheetContent>
    </Actionsheet>
  );
}

export default MarkerFilterActionSheet;
