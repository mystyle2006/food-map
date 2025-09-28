import { Pressable, Text, View } from 'react-native';
import React from 'react';
import { useLocationStore } from '@app/store/location';
import { LatLng } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { RegionInfo } from '@app/hooks/useSearchLocation';
import Ionicons from '@react-native-vector-icons/ionicons';
import { colors } from '@app/constants/colors';

export const SearchRegionItem = ({ region }: { region: RegionInfo }) => {
  const navigation = useNavigation();
  const { setMoveLocation, setSelectLocation } = useLocationStore();

  const handlePressRegionInfo = (latitude: string, longitude: string) => {
    const regionLocation = {
      latitude: Number(latitude),
      longitude: Number(longitude),
    };

    moveToMapScreen(regionLocation);
  };

  const moveToMapScreen = (location: LatLng) => {
    navigation.goBack();
    setMoveLocation(location);
    setSelectLocation(location);
  };

  return (
    <Pressable
      className={'mx-[5px] py-[10px] gap-[3px] border-b border-[#D8D8D8]'}
      onPress={() => handlePressRegionInfo(region.y, region.x)}
    >
      <View className="flex-row items-center gap-[5px]">
        <Ionicons name="location" size={10} color={colors.PINK_700} />
        <Text
          className="text-black flex-shrink-1 text-[16px] font-semibold"
          ellipsizeMode="tail"
          numberOfLines={1}
        >
          {region.place_name}
        </Text>
      </View>
      <View className="flex-row gap-[10px]">
        <View className="flex flex-row items-center gap-px">
          {Array.from({ length: 5 }, (_, idx) => (
            <Text key={idx}>
              <Ionicons
                name={idx < Math.floor(region.rating) ? 'star' : 'star-outline'}
                size={12}
                color={colors.YELLOW_500}
              />
            </Text>
          ))}
          <Text className="text-[12px] ml-1.5">{region.rating}</Text>
        </View>
        <Text className="text-[#8E8E8E] flex-shrink-1">
          {region.category_name}
        </Text>
      </View>
      <Text className="text-[#8E8E8E] flex-shrink-1">
        {region.road_address_name}
      </Text>
    </Pressable>
  );
};
