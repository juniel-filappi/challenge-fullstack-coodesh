import { NextFunction, Request, Response } from "express";
import { createReadStream } from "fs";

import { readFileAndSave } from "../helpers";
import { apiMessage } from "../helpers/apiMessage";
import { UploadRepository } from "../repositories/UploadRepository";
import { validateUpload } from "../validations/uploadValidator";

export class UploadController {
  async upload(req: Request, res: Response, next: NextFunction) {
    try {
      const { file } = validateUpload.parse(req.files);
      const uploadRepository = new UploadRepository();

      file.mv(`./uploads/${file.name}`);
      const read = createReadStream(`./uploads/${file.name}`);

      const linesToSave = await readFileAndSave(read);

      if (linesToSave) {
        uploadRepository.saveFileUpload(linesToSave, req.user_id);
      }

      return res.send(apiMessage(true, 201, "Arquivo enviado com sucesso"));
    } catch (error) {
      return next(error);
    }
  }

  async getUploads(req: Request, res: Response, next: NextFunction) {
    try {
      const uploadRepository = new UploadRepository();

      const uploads = await uploadRepository.getUploads(req.user_id);

      return res.send(apiMessage(true, 200, "Uploads", uploads));
    } catch (error) {
      return next(error);
    }
  }
}
