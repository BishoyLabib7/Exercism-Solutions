/**
 * Converts Decimal numbers to Roman numerals using functional recursion.
 * * Logic:
 * - Uses an explicit base case to stop recursion when the numeral list is exhausted.
 * - Employs a bitwise "OR" track (n | 0) for integer division; this effectively 
 * - Processes repeating symbols (like 'MMM') in a single step via .repeat(), 
  * keeping the call stack shallow (max 13 calls).
 */

const ROMAN_NUMERALS = [
    ["M",  1000], ["CM",  900], ["D",   500], ["CD",  400],
    ["C",   100], ["XC",   90], ["L",    50], ["XL",   40],
    ["X",    10], ["IX",    9], ["V",     5], ["IV",    4],
    ["I",     1],
];

export const toRoman = (decimalNumber, [current, ...rest] = ROMAN_NUMERALS) => {
  if (!current) return "";
  
  const [RomanSymbol, value] = current;
  const count = (decimalNumber / value) | 0;

  return RomanSymbol.repeat(count) + toRoman(decimalNumber % value, rest);
};
