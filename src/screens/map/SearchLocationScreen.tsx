import SearchInput from '@app/components/map/SearchInput';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useUserLocation } from '@app/hooks/useUserLocation';
import useSearchLocation from '@app/hooks/useSearchLocation';
import SearchRegionResult from '@app/components/map/SearchRegionResult';

function SearchLocationScreen() {
  const [keyword, setKeyword] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const { userLocation } = useUserLocation();
  const { regionInfo } = useSearchLocation(searchKeyword, userLocation);

  const handleSubmitKeyword = () => {
    console.log('>>> test');
    setSearchKeyword(keyword);
  };

  return (
    <View style={styles.container}>
      <SearchInput
        value={keyword}
        onChangeText={setKeyword}
        onSubmit={handleSubmitKeyword}
        placeholder="Please enter a place to search"
      />
      <SearchRegionResult regionInfo={regionInfo} />
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
