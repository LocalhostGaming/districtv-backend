import { Prisma } from '@prisma/client';
import { PrismaSelect } from 'src/helpers/prismaSelect';

const prismaSelect = new PrismaSelect<Prisma.UserSelect>();

export const UserSelect = prismaSelect.get({
  id: true,
  username: true,
  email: true,
  role: true,
  createdAt: true,
  updatedAt: true,
});
