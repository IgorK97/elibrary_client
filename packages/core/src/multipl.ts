export const multiply = (...args: number[]) => {
  let sum = 1;
  for (const arg of args) sum *= arg;
  return sum;
};
