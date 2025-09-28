import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

import { RegionInfo } from '@app/hooks/useSearchLocation';
import { colors } from '@app/constants/colors';

interface SearchRegionResultProps {
  regionInfo: RegionInfo[];
}

function SearchRegionResult({ regionInfo }: SearchRegionResultProps) {
  return (
    <View className="border border-[#E7E7E7] rounded w-full my-[5px] h-[50vh]">
      <ScrollView className="p-[10px]">
        {regionInfo.map((info, index) => {
          return (
            <Pressable
              key={info.id}
              className={`mx-[5px] py-[10px] gap-[3px] ${
                index !== regionInfo.length - 1
                  ? 'border-b border-[#D8D8D8]'
                  : ''
              }`}
            >
              <View className="flex-row items-center gap-[5px]">
                <Ionicons name="location" size={10} color={colors.PINK_700} />
                <Text
                  className="text-black flex-shrink-1 text-[16px] font-semibold"
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >
                  {info.place_name}
                </Text>
              </View>
              <View className="flex-row gap-[10px]">
                <View className="flex flex-row items-center gap-px">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Text>
                      <Ionicons
                        key={index}
                        name={
                          index < Math.floor(info.rating)
                            ? 'star'
                            : 'star-outline'
                        }
                        size={12}
                        color={colors.YELLOW_500}
                      />
                    </Text>
                  ))}
                  <Text className="text-[12px] ml-1.5">{info.rating}</Text>
                </View>

                <Text className="text-[#8E8E8E] flex-shrink-1">
                  {info.category_name}
                </Text>
              </View>
              <Text className="text-[#8E8E8E] flex-shrink-1">
                {info.road_address_name}
              </Text>
            </Pressable>
          );
        })}

        {regionInfo.length === 0 && (
          <View className="flex-1 items-center mt-[50px]">
            <Text className="text-[#8E8E8E] text-[16px]">
              검색 결과가 없습니다.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

export default SearchRegionResult;
