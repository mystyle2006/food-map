import { SafeAreaView, Text } from 'react-native';
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@app/components/ui/form-control';
import { Input, InputField } from '@app/components/ui/input';
import { AlertCircleIcon } from '@app/components/ui/icon';
import { Button, ButtonText } from '@app/components/ui/button';
import { VStack } from '@app/components/ui/vstack';
import useForm from '@app/hooks/useForm.tsx';

function SignupScreen() {
  const signupForm = useForm({
    initialValue: { email: '', password: '', passwordConfirm: '' },
  });

  const handleSubmit = () => {
    const newErrors = {
      email: '',
      password: '',
      passwordConfirm: '',
    };
  };

  return (
    <SafeAreaView>
      <VStack className="px-container-x gap-3">
        {/* Email */}
        <FormControl isInvalid={signupForm.errors.email} size="md">
          <FormControlLabel>
            <FormControlLabelText>Email</FormControlLabelText>
          </FormControlLabel>
          <Input className="my-1" size="md">
            <InputField
              type="text"
              placeholder="email@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              {...signupForm.getTextInputProps('email')}
            />
          </Input>
          <FormControlError>
            <FormControlErrorIcon
              as={AlertCircleIcon}
              className="text-red-500"
            />
            <FormControlErrorText className="text-red-500" />
          </FormControlError>
        </FormControl>

        {/* Password */}
        <FormControl
          isInvalid={signupForm.errors.password}
          size="md"
          isDisabled={false}
          isReadOnly={false}
        >
          <FormControlLabel>
            <FormControlLabelText>Password</FormControlLabelText>
          </FormControlLabel>
          <Input className="my-1" size="md">
            <InputField
              type="password"
              placeholder="password"
              {...signupForm.getTextInputProps('password')}
            />
          </Input>
          <FormControlError>
            <FormControlErrorIcon
              as={AlertCircleIcon}
              className="text-red-500"
            />
            <FormControlErrorText className="text-red-500" />
          </FormControlError>
        </FormControl>

        {/* Password Confirm */}
        <FormControl
          isInvalid={signupForm.errors.passwordConfirm}
          size="md"
          isDisabled={false}
          isReadOnly={false}
        >
          <FormControlLabel>
            <FormControlLabelText>Password Confirm</FormControlLabelText>
          </FormControlLabel>
          <Input className="my-1" size="md">
            <InputField
              type="password"
              placeholder="password"
              {...signupForm.getTextInputProps('passwordConfirm')}
            />
          </Input>
          <FormControlError>
            <FormControlErrorIcon
              as={AlertCircleIcon}
              className="text-red-500"
            />
            <FormControlErrorText className="text-red-500" />
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
