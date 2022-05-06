import keccak256 from 'keccak256';

type Props = {
  senderChainId: number | null,
  otherParticipantChainId: number | undefined,

  senderNetwork: string,
  otherParticipantNetwork: string,

  senderAddress: string,
  otherParticipantAddress: string,

  senderAmount,
  otherParticipantAmount,

  senderToken: string,
  otherParticipantToken: string,

  senderPenalty: string,
  otherParticipantPenalty: string,
};

/**
 * useTradeHash is a hook to convert data into trade hash
 */

export const useTradeHash = ({
  senderChainId,
  otherParticipantChainId,

  senderNetwork,
  otherParticipantNetwork,

  senderAddress,
  otherParticipantAddress,

  senderAmount,
  otherParticipantAmount,

  senderToken,
  otherParticipantToken,

  senderPenalty,
  otherParticipantPenalty,
}: Props) => {
  const timestamp = Date.now();

  const tradeString = `${senderNetwork}${otherParticipantNetwork}
  ${senderChainId}${otherParticipantChainId}
  ${senderAddress}${otherParticipantAddress}
  ${senderToken}${otherParticipantToken}
  ${senderAmount}${otherParticipantAmount}
  ${senderPenalty}${otherParticipantPenalty}
  ${timestamp}`;

  const tradeHash = keccak256(tradeString).toString('hex');

  return { tradeHash, tradeString };
};
