import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
  const createUsers = async () => {
    const password = await bcrypt.hash('password', 10);
    try {
      await prisma.users.deleteMany();
      await prisma.users.upsert({
        where: {
          id: 0,
        },
        update: {},
        create: {
          username: 'user',
          password: String(password),
          email: 'user@mail.com',
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  await createUsers();
};

main();
