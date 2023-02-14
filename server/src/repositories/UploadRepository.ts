import { prisma } from "../database/client";
import { IOutput } from "../helpers";

export class UploadRepository {
  async saveFileUpload(file: IOutput, userId: number) {
    try {
      const findType = await prisma.type.findFirstOrThrow({
        where: {
          type: file.type,
        },
      });

      if (!findType) {
        throw new Error("Type not found");
      }

      const upload = await prisma.upload.create({
        data: {
          date: file.date,
          product: file.product,
          value: file.value,
          salesman: file.salesman,
          type: {
            connect: {
              id: findType.id,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });

      return upload;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
