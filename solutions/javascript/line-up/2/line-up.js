/**
 * Determines the ordinal suffix (st, nd, rd, th) using built-in JS rules.
 * This handles the 11, 12, 13 "th" edge cases automatically.
 */

const getOrdinal = (number) => {
  const enOrdinalRules  = new Intl.PluralRules("en-US", { type: "ordinal" });
  const suffixes = {
    one: "st",
    two: "nd",
    few: "rd",
    other: "th",
  };

  const category = enOrdinalRules.select(number);
  return `${number}${suffixes[category]}`;
};


export const format = (name, number) => {
  return `${name}, you are the ${getOrdinal(number)} customer we serve today. Thank you!`;
};
