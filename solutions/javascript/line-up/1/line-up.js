//
// This is only a SKELETON file for the 'Line Up' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

const NUMBERS_ENDING_RULES = {
  1: "st",
  2: "nd",
  3: "rd",
};

const numbersEnding = (number) => {
   const endNumber = number % 100;
  return (endNumber === 11 || endNumber === 12 || endNumber === 13)
    ? `${number}th`
    : `${number}${NUMBERS_ENDING_RULES[number % 10] || "th"}`;
};

export const format = (name, number) => {
  return `${name}, you are the ${numbersEnding(number)} customer we serve today. Thank you!`;
};
