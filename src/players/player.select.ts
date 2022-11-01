import { Prisma } from '@prisma/client';
import { PrismaSelect } from 'src/helpers/prismaSelect';
import { UserSelect } from 'src/users/users.select';

const prismaSelect = new PrismaSelect<Prisma.PlayerSelect>();

export const PlayerSelect = prismaSelect.get({
  id: true,
  user: {
    select: UserSelect,
  },
  citizen: true,
  position: true,
  stats: true,
  createdAt: true,
  updatedAt: true,
});
