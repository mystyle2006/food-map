import { SafeAreaView, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { FeedStackParamList } from '@app/types/navigation';

type Props = StackScreenProps<FeedStackParamList, 'FeedDetail'>;

function FeedDetailScreen({ route }: Props) {
  const { id } = route.params;
  return (
    <SafeAreaView>
      <Text>FeedScreen {id}</Text>
    </SafeAreaView>
  );
}

export default FeedDetailScreen;
