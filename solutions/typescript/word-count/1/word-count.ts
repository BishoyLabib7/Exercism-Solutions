export const count = (str: string) =>
  (str.toLowerCase().match(/\w+/g) || []).reduce(
    (acc, word) => acc.set(word, (acc.get(word) || 0) + 1),
    new Map<string, number>(),
  );
