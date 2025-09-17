import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '@app/types/navigation.ts';
import React from 'react';

type NavigationType = StackNavigationProp<AuthStackParamList>;

export const AuthHomeScreen = () => {
  const navigation = useNavigation<NavigationType>();
  return (
    <SafeAreaView>
      <Text onPress={() => navigation.navigate('Login')}>Login</Text>
    </SafeAreaView>
  );
};
