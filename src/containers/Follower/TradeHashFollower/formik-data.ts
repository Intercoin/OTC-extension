import { object, string } from 'yup';
import { VALIDATION_ERROR_MESSAGES } from '../../../constants';

export type Values = {
  senderAmount: string,
  hash: string,
  senderToken: { value: string, label: string },
  senderPenalty: string,

  otherParticipantAddress: string,
};

export const initialValues = {
  senderAmount: '',
  hash: '',
  senderPenalty: '',
  senderToken: { value: '', label: 'Select the asset' },

  otherParticipantAddress: '',
};

export const validationSchema = object().shape({
  senderAmount: string().required(VALIDATION_ERROR_MESSAGES.REQUIRED),
  hash: string().required(VALIDATION_ERROR_MESSAGES.REQUIRED),
  senderPenalty: string().required(VALIDATION_ERROR_MESSAGES.REQUIRED),

  senderToken: object().shape({
    value: string().required(VALIDATION_ERROR_MESSAGES.REQUIRED),
  }),

  otherParticipantAddress: string().required(VALIDATION_ERROR_MESSAGES.REQUIRED),
});
