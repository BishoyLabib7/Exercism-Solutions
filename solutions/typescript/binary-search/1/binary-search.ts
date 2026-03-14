function binarySearch(sortedArray: number[], needle: number): number | never {
  let left: number = 0;
  let right: number = sortedArray.length - 1;

  while (left <= right) {
    const middle: number = left + ((right - left) >> 1);
    const current: number = sortedArray[middle];
    if (current === needle) return middle;
    else if (current < needle) left = middle + 1;
    else right = middle - 1;
  }
 throw new Error('Value not in array')
}

export function find(haystack: number[], needle: number): number | never {
  return binarySearch(
    haystack,
    needle,
  );
}

