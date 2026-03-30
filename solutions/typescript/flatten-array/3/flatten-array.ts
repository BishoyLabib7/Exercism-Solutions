type Nested<T> = Array<T | null | undefined | Nested<T>>;

export function flatten<T>(array: Nested<T>): T[] {
  const result: T[] = [];

  for (const item of array) {
    if (Array.isArray(item)) {
      result.push(...flatten(item));
    } else if (item !== null && item !== undefined) {
      result.push(item);
    }
  }

  return result;
}