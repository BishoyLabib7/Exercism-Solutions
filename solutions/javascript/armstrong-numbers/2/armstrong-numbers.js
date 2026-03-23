//
// This is only a SKELETON file for the 'Armstrong Numbers' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const isArmstrongNumber = (input) => {
  const number = BigInt(input);
  const digits = [...number.toString()];
  const power = BigInt(digits.length);

  return (
    number ===
    digits.reduce((result, char) => result + BigInt(char) ** power, 0n)
  );
};