export const numSequence = (num: number): number[] => {
  const result: number[] = [];

  if (typeof(num) !== 'number' || num < 1) {
    return result;
  }

  for (let i = 0; i < num; i++) {
    result.push(i);
  };

  return result;
}

