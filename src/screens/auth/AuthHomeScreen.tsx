import { useNavigation } from '@react-navigation/native';
import { Image, Platform, SafeAreaView, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '@app/types/navigation';
import React from 'react';
import { Button, ButtonText } from '@app/components/ui/button';
import appleAuth, {
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import { useAuth } from '@app/hooks/useAuth';
import { Toast, ToastDescription, useToast } from '@app/components/ui/toast';
import { errorMessages } from '@app/constants/messages';
import FastImage from 'react-native-fast-image';

type NavigationType = StackNavigationProp<AuthStackParamList>;

export const AuthHomeScreen = () => {
  const navigation = useNavigation<NavigationType>();
  const { appleLoginMutation } = useAuth();
  const toast = useToast();

  const handleAppleLogin = async () => {
    try {
      const { identityToken, fullName } = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      if (identityToken) {
        appleLoginMutation.mutate({
          identityToken,
          appId: 'org.reactjs.native.example.food-map',
          nickname: fullName?.givenName ?? '',
        });
      }
    } catch (error) {
      console.info(error);
      if ((error as { code: string }).code !== appleAuth.Error.CANCELED) {
        toast.show({
          placement: 'bottom',
          duration: 3000,
          containerStyle: {
            marginBottom: 30,
          },
          render: ({ id }) => {
            const uniqueToastId = 'toast-' + id;
            return (
              <Toast nativeID={uniqueToastId} action="error" variant="outline">
                <ToastDescription>
                  {errorMessages.UNEXPECT_ERROR}
                </ToastDescription>
              </Toast>
            );
          },
        });
      }
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center justify-center">
        <Image
          source={require('@app/assets/logo.png')}
          className="w-[160px]"
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <View className="flex-1 gap-3 px-4 justify-center">
        {Platform.OS === 'ios' && (
          <AppleButton
            buttonStyle={AppleButton.Style.BLACK}
            buttonType={AppleButton.Type.SIGN_IN}
            style={{
              height: 35,
            }}
            cornerRadius={3}
            onPress={handleAppleLogin}
          />
        )}
        <Button onPress={() => navigation.navigate('Login')} variant="outline">
          <ButtonText>Log in</ButtonText>
        </Button>
        <Button onPress={() => navigation.navigate('Signup')} variant="link">
          <ButtonText>No Account? Sign up</ButtonText>
        </Button>
      </View>
    </SafeAreaView>
  );
};
