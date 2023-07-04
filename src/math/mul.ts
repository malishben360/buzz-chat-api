export const mul = (a: number, b: number) => {
  return a * b;
};

export const pow = (value: number) => {
  let result: number = 0;
  for (let i: number = 1; i <= value; i++) result = result * value;
};
