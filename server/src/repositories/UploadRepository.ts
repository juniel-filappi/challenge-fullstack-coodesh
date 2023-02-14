import { prisma } from "../database/client";
import { IOutput } from "../helpers";

export class UploadRepository {
  async saveFileUpload(file: IOutput[], userId: number) {
    try {
      file.forEach(async (line) => {
        const type = await prisma.type.findFirstOrThrow({
          where: {
            type: line.type,
          },
        });

        await prisma.upload.create({
          data: {
            type: {
              connect: {
                id: type.id,
              },
            },
            date: line.date,
            product: line.product,
            value: line.value,
            salesman: line.salesman,
            user: {
              connect: {
                id: userId,
              },
            },
          },
        });
      });

      return true;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getUploads(userId: number) {
    try {
      const uploads = await prisma.upload.findMany({
        where: {
          user_id: userId,
        },
        include: {
          type: true,
        },
        orderBy: {
          date: "desc",
        },
      });

      return uploads;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
