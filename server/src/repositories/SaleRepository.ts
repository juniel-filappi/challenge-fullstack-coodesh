import { prisma } from "../database/client";
import { IOutput } from "../helpers";

export class SaleRepository {
  async saveFileUpload(file: IOutput[], userId: number) {
    try {
      file.forEach(async (line) => {
        const type = await prisma.type.findFirstOrThrow({
          where: {
            type: line.type,
          },
        });

        await prisma.sale.create({
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

  async getSales(userId: number) {
    try {
      const sales = await prisma.sale.findMany({
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

      return sales;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async deleteSale(saleId: number) {
    try {
      const findSale = await prisma.sale.findFirst({
        where: {
          id: saleId,
        },
      });

      if (!findSale) {
        throw new Error("Venda não encontrada");
      }

      await prisma.sale.delete({
        where: {
          id: findSale.id,
        },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
