import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from '../entity/cart-item.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem) private cartRepo: Repository<CartItem>,
    private usersService: UsersService,
    private productsService: ProductsService,
  ) {}

  async getCart(userId: number) {
    return this.cartRepo.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });
  }

  async addToCart(userId: number, productId: number, quantity = 1) {
    const user = await this.usersService.findById(userId);
    const product = await this.productsService.findById(productId);

    if (product.stock < quantity) {
      throw new BadRequestException('Insufficient stock');
    }

    // FIX: filter by relation like this
    let item = await this.cartRepo.findOne({
      where: {
        user: { id: userId },
        product: { id: productId },
      },
    });

    if (item) {
      item.quantity += quantity;
    } else {
      item = this.cartRepo.create({
        user,
        product,
        quantity,
      });
    }

    return this.cartRepo.save(item);
  }

  async updateQuantity(userId: number, cartItemId: number, quantity: number) {
    const item = await this.cartRepo.findOne({
      where: { id: cartItemId },
      relations: ['user', 'product'],
    });

    if (!item || item.user.id !== userId) {
      throw new NotFoundException('Cart item not found');
    }

    if (quantity <= 0) {
      await this.cartRepo.remove(item);
      return { removed: true };
    }

    if (item.product.stock < quantity) {
      throw new BadRequestException('Insufficient stock');
    }

    item.quantity = quantity;
    return this.cartRepo.save(item);
  }

  async removeItem(userId: number, cartItemId: number) {
    const item = await this.cartRepo.findOne({
      where: { id: cartItemId },
      relations: ['user'],
    });

    if (!item || item.user.id !== userId) {
      throw new NotFoundException('Cart item not found');
    }

    await this.cartRepo.remove(item);
    return { removed: true };
  }

  async clearCart(userId: number) {
    const items = await this.cartRepo.find({
      where: { user: { id: userId } },
    });

    await this.cartRepo.remove(items);
  }
}
