import { UploadedFile } from "express-fileupload";
import { z } from "zod";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["text/plain"];

export const validateUpload = z.object({
  file: z.custom<UploadedFile>(
    (file: any) => {
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
    }
  ),
});
