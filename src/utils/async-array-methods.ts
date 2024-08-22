export type MapAsyncCallback<T, U> = (value: T, index?: number, array?: readonly T[]) => Promise<U>;
export async function asyncMap<T, U>(array: T[], callback: MapAsyncCallback<T, U>): Promise<U[]> {
  const mappedArray: U[] = [];
  for (let i = 0; i < array.length; i++) {
    const result = await callback(array[i], i, array);
    mappedArray.push(result);
  }
  return mappedArray;
}
