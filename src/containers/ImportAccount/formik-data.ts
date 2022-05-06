import { object, string } from 'yup';
import { VALIDATION_ERROR_MESSAGES } from '../../constants';

export type Values = {
  name: string,
  privateKey: string,
};

export const initialValues = {
  name: '',
  privateKey: '',
};

export const validationSchema = object().shape({
  name: string().required(VALIDATION_ERROR_MESSAGES.REQUIRED),
  privateKey: string().required(VALIDATION_ERROR_MESSAGES.REQUIRED),
});
