enum COLORS {
  black,
  brown,
  red,
  orange,
  yellow,
  green,
  blue,
  violet,
  grey,
  white,
}

enum units {
  kiloohms = 3,
  megaohms = 6,
  gigaohms = 9,
}

export function decodedResistorValue(colors: (keyof typeof COLORS)[]) {
  const [firstColor, secondColor, multiplierColor] = colors;
  const firstDigit = COLORS[firstColor];
  const secondDigit = COLORS[secondColor];
  const multiplier = COLORS[multiplierColor];

  let value = (firstDigit * 10 + secondDigit) * 10 ** multiplier;

  if (value >= 10 ** units.gigaohms) {
    return value / 10 ** units.gigaohms + " gigaohms";
  }

  if (value >= 10 ** units.megaohms) {
    return value / 10 ** units.megaohms + " megaohms";
  }

  if (value >= 10 ** units.kiloohms) {
    return value / 10 ** units.kiloohms + " kiloohms";
  }

  return value + " ohms";
}
