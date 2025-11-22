import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entity/order.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CartItem } from '../entity/cart-item.entity';
import { CartService } from '../cart/cart.service';
import { ProductsService } from '../products/products.service';
import { OrderItem } from '../entity/order-item.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    private usersService: UsersService,
    private cartService: CartService,
    private productsService: ProductsService,
  ) {}

  async checkout(
    userId: number,
    dto: { customerName: string; address: string; phone: string },
  ) {
    const user = await this.usersService.findById(userId);
    const cartItems: CartItem[] = await this.cartService.getCart(userId);

    if (!cartItems.length) throw new BadRequestException('Cart is empty');

    let total = 0;
    const items: OrderItem[] = [];
    for (const c of cartItems) {
      if (c.product.stock < c.quantity)
        throw new BadRequestException(
          `Insufficient stock for ${c.product.name}`,
        );
      total += Number(c.product.price) * c.quantity;

      const oi = new OrderItem();
      oi.product = c.product;
      oi.quantity = c.quantity;
      oi.price = Number(c.product.price);
      items.push(oi);
    }

    const order = this.orderRepo.create({
      user,
      customerName: dto.customerName,
      address: dto.address,
      phone: dto.phone,
      total,
      items,
    });
    const saved = await this.orderRepo.save(order);

    for (const c of cartItems) {
      await this.productsService.reduceStock(c.product.id, c.quantity);
    }

    await this.cartService.clearCart(userId);

    return saved;
  }

  async listUserOrders(userId: number) {
    // Query by user id to avoid object-equality issues when passing an entity instance
    return this.orderRepo.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
      relations: ['user', 'items'],
    });
  }
}
