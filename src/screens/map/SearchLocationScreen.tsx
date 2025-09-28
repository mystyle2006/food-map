import SearchInput from '@app/components/map/SearchInput';
import React, { useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { useUserLocation } from '@app/hooks/useUserLocation';
import useSearchLocation from '@app/hooks/useSearchLocation';
import SearchRegionResult from '@app/components/map/SearchRegionResult';

function SearchLocationScreen() {
  const [keyword, setKeyword] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const { userLocation } = useUserLocation();
  const {
    regionInfo,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useSearchLocation(searchKeyword, userLocation);

  const handleSubmitKeyword = () => {
    setSearchKeyword(keyword);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <SearchInput
        autoFocus
        value={keyword}
        onChangeText={setKeyword}
        onSubmit={handleSubmitKeyword}
        placeholder="Please enter a place to search"
      />
      <SearchRegionResult
        regionInfo={regionInfo}
        onLoadMore={fetchNextPage}
        hasNextPage={Boolean(hasNextPage)}
        isFetchingNextPage={isFetchingNextPage}
        isLoading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 15,
  },
});

export default SearchLocationScreen;
