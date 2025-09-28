import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { RegionInfo } from '@app/hooks/useSearchLocation';
import { SearchRegionItem } from '@app/components/map/SearchRegionItem';

interface SearchRegionResultProps {
  regionInfo: RegionInfo[];
  onLoadMore: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
}

function SearchRegionResult({
  regionInfo,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
}: SearchRegionResultProps) {
  const renderEmpty = () => {
    if (isLoading) {
      return null;
    }

    return (
      <View className="flex-1 items-center mt-[50px]">
        <Text className="text-[#8E8E8E] text-[16px]">No Result</Text>
      </View>
    );
  };

  return (
    <View className="border border-[#E7E7E7] rounded w-full my-[5px] flex-1">
      <FlatList
        contentContainerClassName="p-[10px]"
        data={regionInfo}
        renderItem={({ item }) => <SearchRegionItem region={item} />}
        keyExtractor={(item) => item.id}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            onLoadMore();
          }
        }}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
}

export default SearchRegionResult;
