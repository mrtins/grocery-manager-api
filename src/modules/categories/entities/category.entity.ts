import { Prisma } from '@prisma/client';

export class CategoryEntity implements Prisma.CategoryUncheckedCreateInput {
  id?: number;
  userId: number;
  categoryName: string;
  description?: string;

  constructor(partial: Partial<CategoryEntity>) {
    Object.assign(this, partial);
  }
}
