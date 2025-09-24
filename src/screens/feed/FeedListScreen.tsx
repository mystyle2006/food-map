import { SafeAreaView } from 'react-native';
import FeedList from '@app/components/feed/FeedList';

function FeedListScreen() {
  return (
    <SafeAreaView className="flex-1">
      <FeedList />
    </SafeAreaView>
  );
}

export default FeedListScreen;
