import { SafeAreaView } from 'react-native';
import FeedList from '@app/components/feed/FeedList';
import { Suspense } from 'react';
import Indicator from '@app/components/Indicator';

function FeedListScreen() {
  return (
    <SafeAreaView className="flex-1">
      <Suspense fallback={<Indicator size={'large'} />}>
        <FeedList />
      </Suspense>
    </SafeAreaView>
  );
}

export default FeedListScreen;
