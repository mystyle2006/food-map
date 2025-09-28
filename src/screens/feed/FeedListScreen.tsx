import { SafeAreaView } from 'react-native';
import FeedList from '@app/components/feed/FeedList';
import { Suspense } from 'react';
import Indicator from '@app/components/Indicator';
import RetryErrorBoundary from '@app/components/RetryErrorBoundary';

function FeedListScreen() {
  return (
    <SafeAreaView className="flex-1">
      <RetryErrorBoundary>
        <Suspense fallback={<Indicator size={'large'} />}>
          <FeedList />
        </Suspense>
      </RetryErrorBoundary>
    </SafeAreaView>
  );
}

export default FeedListScreen;
