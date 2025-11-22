import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entity/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  async list() {
    return this.repo.find();
  }

  async findById(id: number) {
    const p = await this.repo.findOneBy({ id });
    if (!p) throw new NotFoundException('Product not found');
    return p;
  }

  async reduceStock(id: number, qty: number) {
    const product = await this.findById(id);
    if (product.stock < qty)
      throw new BadRequestException('Insufficient stock');
    product.stock -= qty;
    return this.repo.save(product);
  }

  async create(data: Partial<Product>) {
    const p = this.repo.create(data);
    return this.repo.save(p);
  }
}
