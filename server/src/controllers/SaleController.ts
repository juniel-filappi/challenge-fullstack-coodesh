import { NextFunction, Request, Response } from "express";
import { createReadStream } from "fs";

import { readFileAndSave } from "../helpers";
import { apiMessage } from "../helpers/apiMessage";
import { SaleRepository } from "../repositories/SaleRepository";
import {
  validateDeleteSale,
  validateUpload,
} from "../validations/uploadValidator";

export class SaleController {
  async upload(req: Request, res: Response, next: NextFunction) {
    try {
      const { file } = validateUpload.parse(req.files);
      const saleRepository = new SaleRepository();

      file.mv(`./uploads/${file.name}`);
      const read = createReadStream(`./uploads/${file.name}`);

      const linesToSave = await readFileAndSave(read);

      if (linesToSave) {
        saleRepository.saveFileUpload(linesToSave, req.user_id);
      }

      return res.send(apiMessage(true, 201, "Arquivo enviado com sucesso"));
    } catch (error) {
      return next(error);
    }
  }

  async getSales(req: Request, res: Response, next: NextFunction) {
    try {
      const saleRepository = new SaleRepository();

      const sales = await saleRepository.getSales(req.user_id);

      return res.send(apiMessage(true, 200, "Vendas", sales));
    } catch (error) {
      return next(error);
    }
  }

  async deleteSale(req: Request, res: Response, next: NextFunction) {
    try {
      const saleRepository = new SaleRepository();
      const { id } = validateDeleteSale.parse(req.params);

      await saleRepository.deleteSale(parseInt(id, 10));

      return res.send(apiMessage(true, 200, "Venda deletada com sucesso"));
    } catch (error) {
      return next(error);
    }
  }
}
