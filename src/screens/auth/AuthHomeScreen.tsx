import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '@app/types/navigation.ts';
import Logo from '@app/assets/logo.svg';
import React from 'react';
import { Button, ButtonText } from '@app/components/ui/button';

type NavigationType = StackNavigationProp<AuthStackParamList>;

export const AuthHomeScreen = () => {
  const navigation = useNavigation<NavigationType>();
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center justify-center">
        <Logo width={160} />
      </View>
      <View className="flex-1 gap-3 px-4 justify-center">
        <Button onPress={() => navigation.navigate('Login')}>
          <ButtonText>Log in</ButtonText>
        </Button>
        <Button onPress={() => navigation.navigate('Signup')}>
          <ButtonText>Sign up</ButtonText>
        </Button>
      </View>
    </SafeAreaView>
  );
};
