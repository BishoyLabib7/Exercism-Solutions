type Color =
  | "black"  | "brown"
  | "red"    | "orange"
  | "yellow" | "green"
  | "blue"   | "violet"
  | "grey"   | "white";

const COLOR_VALUES: Record<Color, number> = {
  black: 0,
  brown: 1,
  red: 2,
  orange: 3,
  yellow: 4,
  green: 5,
  blue: 6,
  violet: 7,
  grey: 8,
  white: 9,
};

export function decodedValue(colors: Color[]): number {
  const [firstColor, secondColor] = colors;

  return +`${COLOR_VALUES[firstColor]}${COLOR_VALUES[secondColor]}`;
}