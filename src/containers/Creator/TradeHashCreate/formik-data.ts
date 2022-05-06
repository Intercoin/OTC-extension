import { object, string } from 'yup';
import { VALIDATION_ERROR_MESSAGES } from '../../../constants';

export type Values = {
  senderAmount: string,
  hash: string,
  senderToken: { value: string, label: string },
  senderPenalty: string,

  otherParticipantAddress: string,
  otherParticipantAmount: string,
  otherParticipantPenalty: string,
  otherParticipantNetwork: { value: { chainId: number, name: string }, label: string },
  otherParticipantToken: { value: string, label: string },
};

export const initialValues = {
  senderAmount: '',
  hash: '',
  senderPenalty: '',
  senderToken: { value: '', label: 'Select the asset' },

  otherParticipantAddress: '',
  otherParticipantAmount: '',
  otherParticipantPenalty: '',
  otherParticipantNetwork: { value: { chainId: 4, name: 'Rinkeby' }, label: 'Rinkeby' },
  otherParticipantToken: { value: '', label: 'Select the asset' },
};

export const validationSchema = object().shape({
  senderAmount: string().required(VALIDATION_ERROR_MESSAGES.REQUIRED),
  hash: string().required(VALIDATION_ERROR_MESSAGES.REQUIRED),
  senderPenalty: string().required(VALIDATION_ERROR_MESSAGES.REQUIRED),

  senderToken: object().shape({
    value: string().required(VALIDATION_ERROR_MESSAGES.REQUIRED),
  }),

  otherParticipantAddress: string().required(VALIDATION_ERROR_MESSAGES.REQUIRED),
  otherParticipantAmount: string().required(VALIDATION_ERROR_MESSAGES.REQUIRED),
  otherParticipantPenalty: string().required(VALIDATION_ERROR_MESSAGES.REQUIRED),

  otherParticipantNetwork: object().shape({
    value: object().required({ chainId: string().required(VALIDATION_ERROR_MESSAGES.REQUIRED) }),
  }),

  otherParticipantToken: object().shape({
    value: string().required(VALIDATION_ERROR_MESSAGES.REQUIRED),
  }),
});
