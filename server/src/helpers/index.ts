export interface IOutput {
  type: string;
  date: string;
  product: string;
  value: string;
  salesman: string;
}

const type = {
  start: 0,
  end: 1,
};
const date = { start: 1, end: 26 };
const product = { start: 26, end: 56 };
const value = { start: 56, end: 66 };
const salesman = { start: 66, end: 86 };

export function getSlices(inputString: string) {
  const output = {} as IOutput;

  output.type = inputString.slice(type.start, type.end);
  output.date = inputString.slice(date.start, date.end);
  output.product = inputString.slice(product.start, product.end).trim();
  output.value = inputString.slice(value.start, value.end);
  output.salesman = inputString.slice(salesman.start, salesman.end);

  return output;
}
