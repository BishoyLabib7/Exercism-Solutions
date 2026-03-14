export const count = (str: string): Map<string, number> =>
  (str.toLowerCase().match(/[a-z0-9]+('[a-z0-9]+)?/g) || []).
  reduce((acc, word) => acc.set(word, (acc.get(word) || 0) + 1),
    new Map<string, number>(),
  );