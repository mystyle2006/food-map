import FeedFavoriteList from '@app/components/feed/FeedFavoriteList';
import { SafeAreaView } from 'react-native';
import Indicator from '@app/components/Indicator';
import { Suspense } from 'react';

function FeedFavoriteScreen() {
  return (
    <SafeAreaView className="flex-1">
      <Suspense fallback={<Indicator size={'large'} />}>
        <FeedFavoriteList />
      </Suspense>
    </SafeAreaView>
  );
}

export default FeedFavoriteScreen;
