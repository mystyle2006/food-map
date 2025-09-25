import FeedFavoriteList from '@app/components/feed/FeedFavoriteList';
import { SafeAreaView } from 'react-native';

function FeedFavoriteScreen() {
  return (
    <SafeAreaView className="flex-1">
      <FeedFavoriteList />
    </SafeAreaView>
  );
}

export default FeedFavoriteScreen;
