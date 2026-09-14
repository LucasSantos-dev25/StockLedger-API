import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductExistsPipe implements PipeTransform {
  constructor(private readonly prisma: PrismaService) {}

  async transform(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Produto com id ${id} não encontrado`);
    }
    return id;
  }
}