import { prisma } from "../src/index";

async function main() {
  const walter = await prisma.user.upsert({
    where: { email: "walter@gmail.com" },
    update: {},
    create: {
      email: "walter@gmail.com",
      password: "123456",
      name: "walter",
      balance: {
        create: {
          amount: 20000,
          locked: 0,
        },
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "token_1",
          provider: "HDFC Bank",
        },
      },
    },
  });
}

main();
