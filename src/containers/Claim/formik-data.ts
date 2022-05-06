import { object, string } from 'yup';
import { VALIDATION_ERROR_MESSAGES } from '../../constants';

export type Values = {
  hash: string,
  signature: string,
};

export const initialValues = {
  hash: '',
  signature: '',
};

export const validationSchema = object().shape({
  hash: string().required(VALIDATION_ERROR_MESSAGES.REQUIRED),
  signature: string().required(VALIDATION_ERROR_MESSAGES.REQUIRED),
});
