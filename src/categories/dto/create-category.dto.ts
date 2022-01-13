import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CategoryEntity } from '../entities/category.entity';

export class CreateCategoryDto extends CategoryEntity {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  @IsString()
  categoryName: string;

  @IsOptional()
  @IsString()
  description?: string | null;
}
