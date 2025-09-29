import { useNavigation } from '@react-navigation/native';
import { Image, SafeAreaView, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '@app/types/navigation';
import React from 'react';
import { Button, ButtonText } from '@app/components/ui/button';

type NavigationType = StackNavigationProp<AuthStackParamList>;

export const AuthHomeScreen = () => {
  const navigation = useNavigation<NavigationType>();
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center justify-center">
        <Image
          source={require('@app/assets/logo.png')}
          className="w-[160px]"
          resizeMode="contain"
        />
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
