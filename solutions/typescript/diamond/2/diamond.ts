export function makeDiamond(character: string): string {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const targetIndex = alphabet.indexOf(character.toUpperCase());

  const size = targetIndex * 2 + 1;
  let diamond = "";

  for (let i = 0; i < size; i++) {
    const rowIndex = i <= targetIndex ? i : targetIndex * 2 - i;

    const letter = alphabet[rowIndex];
    const outerSpace = " ".repeat(targetIndex - rowIndex);
    const innerSpaceCount = rowIndex * 2 - 1;

    let line = outerSpace + letter;

    if (innerSpaceCount >= 0) {
      line += " ".repeat(innerSpaceCount) + letter;
    }

    line += outerSpace;
    diamond += line + "\n";
  }
  return diamond;
}