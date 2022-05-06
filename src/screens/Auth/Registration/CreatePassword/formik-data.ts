import { object, string } from 'yup';
import { checkIsPasswordValid } from 'utils';
import { VALIDATION_ERROR_MESSAGES } from '../../../../constants';

export type Values = {
  pass: string,
  confirmPass: string,
};

export const initialValues = {
  pass: '',
  confirmPass: '',
};

export const validationSchema = object().shape({
  pass: string()
    .required(VALIDATION_ERROR_MESSAGES.REQUIRED)
    .test(
      'Password test',
      VALIDATION_ERROR_MESSAGES.REQUIRED,
      (value, { parent }) => checkIsPasswordValid(value).isValid && parent.confirmPass === value,
    ),
  confirmPass: string()
    .required(VALIDATION_ERROR_MESSAGES.REQUIRED)
    .test(
      'Password test',
      VALIDATION_ERROR_MESSAGES.REQUIRED,
      (value, { parent }) => checkIsPasswordValid(value).isValid && parent.pass === value,
    ),
});
