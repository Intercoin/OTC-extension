type CheckIsPasswordValidResult = {
  minimum: 0 | 1 | 2;
  isValid: boolean;
};

export const checkIsPasswordValid = (
  password: string | undefined,
): CheckIsPasswordValidResult => {
  const variations: CheckIsPasswordValidResult = {
    minimum: 0,
    isValid: false,
  };
  if (!password) return variations;
  if (password.length >= 8) variations.minimum = 1;
  else variations.minimum = 0;

  variations.isValid = Object.keys(variations).every((key) => {
    if (key === 'isValid') return true;
    return variations[key] === 1;
  });
  return variations;
};
