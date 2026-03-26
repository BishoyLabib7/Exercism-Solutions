const COLORS = [
  "black",
  "brown",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "violet",
  "grey",
  "white",
] as const;

type Color = typeof COLORS[number];

const getColorCode = (color: Color): number => COLORS.indexOf(color);

export function decodedValue(
  colors: readonly [Color, Color],
): number {
  const [firstColor, secondColor] = colors;
  return Number(`${getColorCode(firstColor)}${getColorCode(secondColor)}`);
}