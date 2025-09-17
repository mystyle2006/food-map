import { SafeAreaView, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FeedStackParamList } from '@app/types/navigation.ts';
import { useNavigation } from '@react-navigation/native';

type NavigationType = StackNavigationProp<FeedStackParamList>;

function FeedListScreen() {
  const navigation = useNavigation<NavigationType>();
  return (
    <SafeAreaView>
      <Text>FeedScreen</Text>
      <Text onPress={() => navigation.navigate('FeedDetail', { id: 1 })}>
        first place
      </Text>
    </SafeAreaView>
  );
}

export default FeedListScreen;
