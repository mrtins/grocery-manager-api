import { Prisma } from '@prisma/client';
import { IsDecimal, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Product } from '../entities/product.entity';

export class CreateProductDto extends Product {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  categoryId: number;

  @IsNotEmpty()
  sizeMeasureId: number;

  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsOptional()
  @IsString()
  brandName?: string;

  @IsOptional()
  @IsDecimal()
  averagePrice?: Prisma.Decimal;
}
