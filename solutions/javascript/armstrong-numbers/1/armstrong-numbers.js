//
// This is only a SKELETON file for the 'Armstrong Numbers' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const isArmstrongNumber = (input) => {
  const number = BigInt(input); 

  const digits = number.toString();
  const power = BigInt(digits.length);

  let sum = 0n;

  for (const char of digits) {
    sum += BigInt(char) ** power;
  }

  return sum === number;
};