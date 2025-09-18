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
import { useState } from 'react';

function LoginScreen() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = () => {
    const newErrors = { email: '', password: '' };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 이메일 검증
    if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // 패스워드 검증
    if (password.length < 6) {
      newErrors.password = 'At least 6 characters are required.';
    }

    setErrors(newErrors);

    // 둘 다 에러 없으면 제출 로직
    if (!newErrors.email && !newErrors.password) {
      console.log('✅ Form Submitted', { email, password: password });
    }
  };

  return (
    <SafeAreaView>
      <VStack className="px-container-x gap-3">
        {/* Email */}
        <FormControl isInvalid={!!errors.email} size="md">
          <FormControlLabel>
            <FormControlLabelText>Email</FormControlLabelText>
          </FormControlLabel>
          <Input className="my-1" size="md">
            <InputField
              type="text"
              placeholder="email@example.com"
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </Input>
          <FormControlError>
            <FormControlErrorIcon
              as={AlertCircleIcon}
              className="text-red-500"
            />
            <FormControlErrorText className="text-red-500">
              {errors.email}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

        {/* Password */}
        <FormControl
          isInvalid={!!errors.password}
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
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </Input>
          <FormControlError>
            <FormControlErrorIcon
              as={AlertCircleIcon}
              className="text-red-500"
            />
            <FormControlErrorText className="text-red-500">
              {errors.password}
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
