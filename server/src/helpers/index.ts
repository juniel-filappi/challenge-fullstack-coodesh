export interface IOutput {
  type: number;
  date: string;
  product: string;
  value: number;
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

export function formatValue(value: string) {
  return (parseFloat(value) / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function getSlices(inputString: string) {
  const output = {} as IOutput;

  output.type = parseInt(inputString.slice(type.start, type.end), 10);
  output.date = inputString.slice(date.start, date.end);
  output.product = inputString.slice(product.start, product.end).trim();
  output.value = parseFloat(inputString.slice(value.start, value.end));
  output.salesman = inputString.slice(salesman.start, salesman.end);

  return output;
}
