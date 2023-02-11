import { NextFunction, Request, Response } from "express";
import { createReadStream } from "fs";
import readLine from "readline";
import { getSlices, IOutput } from "../helpers";

import { validateUpload } from "../validations/uploadValidator";

export class UploadController {
  async upload(req: Request, res: Response, next: NextFunction) {
    try {
      const { file } = validateUpload.parse(req.files);

      file.mv(`./uploads/${file.name}`);
      const read = createReadStream(`./uploads/${file.name}`);

      const teste = readLine.createInterface({
        input: read,
        crlfDelay: Infinity,
      });
      const fileFormated = [] as IOutput[];

      // eslint-disable-next-line no-restricted-syntax
      for await (const line of teste) {
        if (line.length) {
          fileFormated.push(getSlices(line));
        }
      }

      console.log((parseFloat(fileFormated[0].value) / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }));
      return res.send(fileFormated);
    } catch (error) {
      return next(error);
    }
  }
}
