import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.userMedServices.deleteMany();
  await prisma.medService.deleteMany();
  await prisma.user.deleteMany();

  for (let i = 1; i <= 75000; i++) {
    await prisma.medService.create({
      data: {
        id: i.toString().padStart(5, '0'),
        name: `Med Service ${i.toString().padStart(5, '0')}`,
        dalilCode: `DALIL ${i.toString().padStart(5, '0')}`,
        code: `MED ${i.toString().padStart(5, '0')}`,
        nationalCode: `${i.toString().padStart(7, '0')}`,
        price: Math.floor(Math.random() * 850) + 1,
        unitSize: Math.floor(Math.random() * 10) + 1,
        numberOfPricing: 0,
        limitNumberOfPricing: Math.floor(Math.random() * 7) + 1,
      },
    });
  }

  await prisma.user.create({
    data: {
      fullName: 'Mohammad Jabah',
      username: `Jabah`,
      role: 'ADMIN',
      hashRefreshToken: '',
      password: await bcrypt.hash('password', 10),
    },
  });

  for (let i = 2; i <= 200; i++) {
    await prisma.user.create({
      data: {
        fullName: `User ${i.toString()}`,
        username: `user${i.toString()}`,
        hashRefreshToken: '',
        password: await bcrypt.hash('password', 10),
        role: 'USER',
      },
    });
  }

  console.log(`Med services Created.`);

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
