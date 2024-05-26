import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const medServices = [];

  await prisma.userMedServices.deleteMany();
  await prisma.medService.deleteMany();

  for (let i = 1; i <= 1000; i++) {
    const medService = await prisma.medService.create({
      data: {
        id: i.toString(),
        name: `Med Service ${i}`,
        dalilCode: `DALIL ${i.toString().padStart(3, '0')}`,
        code: `MED ${i}`,
        nationalCode: `${i.toString().padStart(10, '0')}`,
        price: Math.floor(Math.random() * 500) + 1,
        unitSize: Math.floor(Math.random() * 10) + 1,
        numberOfPricing: 0,
        limitNumberOfPricing: Math.floor(Math.random() * 7) + 1,
      },
    });
    medServices.push(medService);
  }

  console.log(`Created med services:`);

  await prisma.$disconnect();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
