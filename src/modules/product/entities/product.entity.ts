import { Prisma } from '@prisma/client';

export class Product implements Prisma.ProductUncheckedCreateInput {
  id?: number;
  userId: number;
  categoryId: number;
  sizeMeasureId: number;
  productName: string;
  brandName?: string;
  averagePrice?: Prisma.Decimal;

  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }
}
