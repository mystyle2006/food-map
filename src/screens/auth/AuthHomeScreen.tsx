import {useNavigation} from '@react-navigation/native';
import {SafeAreaView, Text, View} from 'react-native';

function AuthHomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View>
        <Text onPress={() => navigation.navigate('Login')}>Login</Text>
      </View>
    </SafeAreaView>
  );
}

export default AuthHomeScreen;
