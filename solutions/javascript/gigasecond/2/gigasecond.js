const GIGASECOND = 1e12;

export const gigasecond = (inputDate) => new Date(inputDate.getTime() + GIGASECOND);

