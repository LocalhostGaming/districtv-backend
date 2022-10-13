import { Prisma } from '@prisma/client';

export const userData: Prisma.UserCreateInput[] = [
  {
    username: 'cypriuxgaming',
    email: 'cypriuxgaming@gmail.com',
    password: 'password',
  },
  {
    username: 'pocky',
    email: 'beaamorbongalos@gmail.com',
    password: 'password',
  },
];
