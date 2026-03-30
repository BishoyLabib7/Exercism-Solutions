type NestedArray<T> = Array<T | NestedArray<T> | null | undefined>;

export function flatten<T>(input: NestedArray<T>): T[] {
  return input.reduce<T[]>((flattenArray, item) => {
    if (Array.isArray(item)) {
      flattenArray.push(...flatten(item));
    } else if (item !== null && item !== undefined) {
      flattenArray.push(item);
    }
    return flattenArray;
  }, []);
}
