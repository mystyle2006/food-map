import { SafeAreaView, TextInput, TextInputProps } from 'react-native';
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@app/components/ui/form-control';
import { VStack } from '@app/components/ui/vstack';
import { Input, InputField } from '@app/components/ui/input';
import { Button, ButtonText } from '@app/components/ui/button';
import useForm from '@app/hooks/useForm';
import { validateLogin } from '@app/validations/signin.valiation';
import { useRef } from 'react';
import { useAuth } from '@app/hooks/useAuth';
import { Toast, ToastDescription, useToast } from '@app/components/ui/toast';
import { errorMessages } from '@app/constants/messages';

function LoginScreen() {
  const { loginMutation } = useAuth();
  const toast = useToast();
  const passwordRef = useRef<TextInputProps & TextInput>(null);

  const loginForm = useForm({
    initialValue: { email: '', password: '' },
    validate: validateLogin,
  });

  const handleSubmit = () => {
    loginMutation.mutate(loginForm.values, {
      onError: (error) => {
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
                  {error.response?.data.message || errorMessages.UNEXPECT_ERROR}
                </ToastDescription>
              </Toast>
            );
          },
        });
      },
    });
  };

  return (
    <SafeAreaView>
      <VStack className="px-container-x gap-3">
        {/* Email */}
        <FormControl
          isInvalid={!!(loginForm.touched.email && loginForm.errors.email)}
          size="md"
        >
          <FormControlLabel>
            <FormControlLabelText>Email</FormControlLabelText>
          </FormControlLabel>
          <Input className="my-1" size="md">
            <InputField
              autoFocus
              submitBehavior="submit"
              returnKeyType="next"
              inputMode="email"
              onSubmitEditing={() => passwordRef?.current?.focus()}
              type="text"
              placeholder="email@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              {...loginForm.getTextInputProps('email')}
            />
          </Input>
          <FormControlError>
            <FormControlErrorText className="text-red-500">
              {loginForm.errors.email}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

        {/* Password */}
        <FormControl
          isInvalid={
            !!(loginForm.touched.password && loginForm.errors.password)
          }
          size="md"
          isDisabled={false}
          isReadOnly={false}
        >
          <FormControlLabel>
            <FormControlLabelText>Password</FormControlLabelText>
          </FormControlLabel>
          <Input className="my-1" size="md">
            <InputField
              ref={passwordRef}
              returnKeyType="join"
              onSubmitEditing={handleSubmit}
              type="password"
              placeholder="password"
              {...loginForm.getTextInputProps('password')}
            />
          </Input>
          <FormControlError>
            <FormControlErrorText className="text-red-500">
              {loginForm.errors.password}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

        <Button className="w-full mt-2" size="md" onPress={handleSubmit}>
          <ButtonText>Login</ButtonText>
        </Button>
      </VStack>
    </SafeAreaView>
  );
}

export default LoginScreen;
