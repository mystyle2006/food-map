import { SafeAreaView } from 'react-native';
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@app/components/ui/form-control';
import { VStack } from '@app/components/ui/vstack';
import { Input, InputField } from '@app/components/ui/input';
import { AlertCircleIcon } from '@app/components/ui/icon';
import { Button, ButtonText } from '@app/components/ui/button';
import useForm from '@app/hooks/useForm.tsx';

function LoginScreen() {
  const loginForm = useForm({
    initialValue: { email: '', password: '' },
  });

  const handleSubmit = () => {};

  return (
    <SafeAreaView>
      <VStack className="px-container-x gap-3">
        {/* Email */}
        <FormControl isInvalid={loginForm.errors.email} size="md">
          <FormControlLabel>
            <FormControlLabelText>Email</FormControlLabelText>
          </FormControlLabel>
          <Input className="my-1" size="md">
            <InputField
              type="text"
              placeholder="email@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              {...loginForm.getTextInputProps('email')}
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
          isInvalid={loginForm.errors.password}
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
              {...loginForm.getTextInputProps('password')}
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

        <Button className="w-full mt-2" size="md" onPress={handleSubmit}>
          <ButtonText>Login</ButtonText>
        </Button>
      </VStack>
    </SafeAreaView>
  );
}

export default LoginScreen;
