import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, Text } from 'react-native';

function AuthHomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <Text onPress={() => navigation.navigate('Login')}>Login</Text>
    </SafeAreaView>
  );
}

export default AuthHomeScreen;
