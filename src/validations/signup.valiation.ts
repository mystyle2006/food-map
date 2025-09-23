import { AccountInformationType } from '@app/types/account';
import { validateAccount } from '@app/validations/account.validation';

export const validateSignup = (
  values: AccountInformationType & { passwordConfirm: string },
) => {
  const errors = validateAccount(values);
  const signupErrors = { ...errors, passwordConfirm: '' };

  if (values.password !== values.passwordConfirm) {
    signupErrors.passwordConfirm = 'Passwords do not match.';
  }

  return signupErrors;
};
