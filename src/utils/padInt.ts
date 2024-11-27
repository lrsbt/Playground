const padInt = (number: number, length: number = 3) => {
  const toAdd = length - number.toString().length;
  const zeros = [...Array(toAdd)].map((_) => 0).join("");
  return `${zeros}${number}`;
};

export { padInt };
