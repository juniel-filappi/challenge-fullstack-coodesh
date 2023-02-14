import { UploadedFile } from "express-fileupload";
import { z } from "zod";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["text/plain"];

export const validateUpload = z.object({
  file: z.custom<UploadedFile>((file: any) => {
    if (!file) {
      throw new Error("File is required");
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new Error("File size is too large");
    }

    if (!ACCEPTED_IMAGE_TYPES.includes(file.mimetype)) {
      throw new Error("File type is not accepted");
    }

    return file;
  }),
});

export const validateUploadSlices = z.object({
  type: z.string().max(1),
  // regex 2022-02-03T20:51:59-03:00
  date: z
    .string()
    .max(25)
    .regex(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}-\d{2}:\d{2}$/,
      "Formato de data inválido"
    ),
  product: z.string().max(30),
  value: z.string().max(10),
  salesman: z.string().max(20),
});
