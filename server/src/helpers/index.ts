import { readFileSync, ReadStream } from "fs";

import { validateUploadSlices } from "../validations/uploadValidator";

export interface IOutput {
  type: number;
  date: string;
  product: string;
  value: number;
  salesman: string;
}

const typeConfig = {
  start: 0,
  end: 1,
};
const dateConfig = { start: 1, end: 26 };
const productConfig = { start: 26, end: 56 };
const valueConfig = { start: 56, end: 66 };
const salesmanConfig = { start: 66, end: 86 };

export function formatValue(value: string) {
  return (parseFloat(value) / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function getSlices(inputString: string) {
  const output = {} as IOutput;

  const type = inputString.slice(typeConfig.start, typeConfig.end);
  const date = inputString.slice(dateConfig.start, dateConfig.end);
  const product = inputString
    .slice(productConfig.start, productConfig.end)
    .trim();
  const value = inputString.slice(valueConfig.start, valueConfig.end);
  const salesman = inputString.slice(salesmanConfig.start, salesmanConfig.end);

  const validateValues = validateUploadSlices.parse({
    type,
    date,
    product,
    value,
    salesman,
  });

  output.type = parseInt(validateValues.type, 10);
  output.date = validateValues.date;
  output.product = validateValues.product;
  output.value = parseFloat(validateValues.value);
  output.salesman = validateValues.salesman;

  return output;
}

export function readFileAndSave(read: ReadStream): Promise<IOutput[]> {
  return new Promise((resolve) => {
    const allFileContents = readFileSync(read.path, "utf8");

    const lines = allFileContents.split(/\r?\n/);
    const linesToSave = lines
      .map((line) => {
        if (line.length) {
          const output = getSlices(line);

          return output;
        }

        return null;
      });

    resolve(linesToSave.filter((line) => line !== null) as IOutput[]);
  });
}
