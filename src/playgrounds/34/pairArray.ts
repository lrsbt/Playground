type input = number[];
type Pair = [number, number];

const removeFromArray = (arr: number[], index: number) => [
  ...arr.slice(0, index),
  ...arr.slice(index + 1, arr.length),
];

const getRandomAvailableIndex = (arr: number[]) =>
  Math.floor(Math.random() * arr.length);

const pairArray = (inputArray: input): Pair[] => {
  let available = inputArray;

  const output = [...Array(Math.ceil(inputArray.length / 2))].map(() => {
    const pair = [...Array(2)].map(() => {
      if (available.length <= 0) return -1;
      const randomIndex = getRandomAvailableIndex(available);
      const value = available[randomIndex];
      available = removeFromArray(available, randomIndex);
      return value;
    });
    return pair as Pair;
  });

  return output;
};

export { pairArray };
