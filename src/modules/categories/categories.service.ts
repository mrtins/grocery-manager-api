import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.prisma.category.create({ data: createCategoryDto });
  }

  findAll() {
    return this.prisma.category.findMany({});
  }

  findOne(id: number) {
    return this.prisma.category.findUnique({ where: { id } });
  }

  findByUser(userId: number) {
    return this.prisma.category.findMany({ where: { userId } });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: number) {
    try {
      await this.prisma.category.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
