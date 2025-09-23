import { AccountInformationType } from '@app/types/account';

export const validateAccount = (values: AccountInformationType) => {
  const errors = {
    email: '',
    password: '',
  };

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email.';
  }
  if (values.password.length < 8 || values.password.length > 20) {
    errors.password = 'Please enter a password between 8 and 20 characters.';
  }

  return errors;
};
