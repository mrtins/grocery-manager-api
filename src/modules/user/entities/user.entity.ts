import { Prisma } from '@prisma/client';

export class User implements Prisma.UserUncheckedCreateInput {
  id?: number;
  firstName: string;
  lastName?: string;
  email: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
