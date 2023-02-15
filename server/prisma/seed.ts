import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

const types = [
  { type: 1, description: "Venda produtor", nature: "Entrada", signal: "+" },
  { type: 2, description: "Venda afiliado", nature: "Entrada", signal: "+" },
  { type: 3, description: "Comissão paga", nature: "Saída", signal: "-" },
  { type: 4, description: "Comissão recebida", nature: "Entrada", signal: "+" },
];

async function run() {
  await Promise.all([
    prisma.user.deleteMany({}),
    prisma.type.deleteMany({}),
    prisma.sale.deleteMany({}),
  ]);

  await Promise.all([
    prisma.user.create({
      data: {
        name: "Alice",
        email: "teste@teste.com",
        password: await hash("123456", 10),
      },
    }),

    prisma.type.createMany({
      data: types,
    })
  ]);
}

run()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
