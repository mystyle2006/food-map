import { SafeAreaView, TextInput, TextInputProps } from 'react-native';
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@app/components/ui/form-control';
import { Input, InputField } from '@app/components/ui/input';
import { Button, ButtonText } from '@app/components/ui/button';
import { VStack } from '@app/components/ui/vstack';
import useForm from '@app/hooks/useForm.tsx';
import { validateSignup } from '@app/validations/signup.valiation.ts';
import { useRef } from 'react';
import { useAuth } from '@app/hooks/useAuth.tsx';

function SignupScreen() {
  const { signupMutation, loginMutation } = useAuth();
  const passwordRef = useRef<TextInputProps & TextInput>(null);
  const passwordConfirmRef = useRef<TextInputProps & TextInput>(null);

  const signupForm = useForm({
    initialValue: { email: '', password: '', passwordConfirm: '' },
    validate: validateSignup,
  });

  const handleSubmit = () => {
    const { email, password } = signupForm.values;

    signupMutation.mutate(
      { email, password },
      {
        onSuccess: () => loginMutation.mutate({ email, password }),
        onError: console.log,
      },
    );
  };

  return (
    <SafeAreaView>
      <VStack className="px-container-x gap-3">
        {/* Email */}
        <FormControl
          isInvalid={!!(signupForm.touched.email && signupForm.errors.email)}
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
              onSubmitEditing={() => passwordRef.current?.focus()}
              type="text"
              placeholder="email@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              {...signupForm.getTextInputProps('email')}
            />
          </Input>
          <FormControlError>
            <FormControlErrorText className="text-red-500">
              {signupForm.errors.email}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

        {/* Password */}
        <FormControl
          isInvalid={
            !!(signupForm.touched.password && signupForm.errors.password)
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
              returnKeyType="next"
              onSubmitEditing={() => passwordConfirmRef.current?.focus()}
              type="password"
              placeholder="password"
              {...signupForm.getTextInputProps('password')}
            />
          </Input>
          <FormControlError>
            <FormControlErrorText className="text-red-500">
              {signupForm.errors.password}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

        {/* Password Confirm */}
        <FormControl
          isInvalid={
            !!(
              signupForm.touched.passwordConfirm &&
              signupForm.errors.passwordConfirm
            )
          }
          size="md"
          isDisabled={false}
          isReadOnly={false}
        >
          <FormControlLabel>
            <FormControlLabelText>Password Confirm</FormControlLabelText>
          </FormControlLabel>
          <Input className="my-1" size="md">
            <InputField
              ref={passwordConfirmRef}
              returnKeyType="join"
              onSubmitEditing={handleSubmit}
              type="password"
              placeholder="password"
              {...signupForm.getTextInputProps('passwordConfirm')}
            />
          </Input>
          <FormControlError>
            <FormControlErrorText className="text-red-500">
              {signupForm.errors.passwordConfirm}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

        <Button className="w-full mt-2" size="sm" onPress={handleSubmit}>
          <ButtonText>Sign up</ButtonText>
        </Button>
      </VStack>
    </SafeAreaView>
  );
}

export default SignupScreen;
