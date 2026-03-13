//
// This is only a SKELETON file for the 'Gigasecond' exercise. It's been provided as a
// convenience to get you started writing code faster.
//
  const GIGASECOND = 1e9;

export const gigasecond = (inputDate) => {
  return new Date(inputDate.getTime() + GIGASECOND * 1000);
};
