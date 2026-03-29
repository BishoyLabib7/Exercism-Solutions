export function transform(
  oldFormat: Record<number, string[]>
): Record<string, number> {
  const result: Record<string, number> = {};

  for (const score in oldFormat) {
    for (const letter of oldFormat[score]) {
      result[letter.toLowerCase()] = Number(score);
    }
  }

  return result;
}