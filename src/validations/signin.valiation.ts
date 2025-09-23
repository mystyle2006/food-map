import { AccountInformationType } from '@app/types/account';
import { validateAccount } from '@app/validations/account.validation';

export const validateLogin = (values: AccountInformationType) => {
  return validateAccount(values);
};
