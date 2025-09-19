import { AccountInformationType } from '@app/types/account.ts';
import { validateAccount } from '@app/validations/account.validation.ts';

export const validateLogin = (values: AccountInformationType) => {
  return validateAccount(values);
};
