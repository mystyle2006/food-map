import { SafeAreaView, Text } from 'react-native';
import DrawerButton from '@app/components/DrawerButton.tsx';
import { useAuth } from '@app/hooks/useAuth.tsx';

function MapHomeScreen() {
  const { logoutMutation } = useAuth();
  return (
    <SafeAreaView>
      <Text onPress={() => logoutMutation.mutate(null)}>Logout</Text>
      <DrawerButton />
    </SafeAreaView>
  );
}

export default MapHomeScreen;
