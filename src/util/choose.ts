function chooseHelper<T>(arr: T[], k: number): T[][] {
  if (k === 1) {
    return arr.map(elt => [elt]);
  }

  if (k === arr.length) {
    return [arr];
  }

  const [first, ...rest] = arr;

  const result = chooseHelper(rest, k - 1).map(comb => {
    comb.push(first);
    return comb;
  });

  chooseHelper(rest, k).forEach(comb => result.push(comb));
  return result;
}

/**
 * Returns all ways of choosing k elements from an array
 */
export default function choose<T>(
  arr: readonly T[],
  k: number,
): ReadonlyArray<readonly T[]> {
  // @ts-expect-error Expected error due to `chooseHelper` requiring
  // a mutable array
  return chooseHelper(arr, k);
}
