export const square = (squares: number): bigint => {
  if (squares < 1 || squares > 64)
    throw new Error("Square must be between 1 and 64");

  const squareValue = BigInt(squares - 1);
  return 2n ** squareValue;
};

export const total = () => {
  return 2n ** 64n - 1n;
};
