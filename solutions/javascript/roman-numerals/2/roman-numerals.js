// Recursive approach for converting Arabic numbers to Roman numerals.
// Instead of using reduce, this version defines an explicit base case (when n === 0).

const ROMAN_NUMERALS = [
  ["M", 1000],
  ["CM", 900],
  ["D", 500],
  ["CD", 400],
  ["C", 100],
  ["XC", 90],
  ["L", 50],
  ["XL", 40],
  ["X", 10],
  ["IX", 9],
  ["V", 5],
  ["IV", 4],
  ["I", 1],
];


export const toRoman = (arabicNumber, [current, ...rest] = ROMAN_NUMERALS) => {
  if (!current || arabicNumber == 0) return "";

  const [RomanSymbol, value] = current;

  const count = (arabicNumber / value) | 0;

  return RomanSymbol.repeat(count) + toRoman(arabicNumber % value, rest);
};
