import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post('checkout')
  async checkout(
    @Request() req,
    @Body() body: { customerName: string; address: string; phone: string },
  ) {
    return this.ordersService.checkout(req.user.userId, body);
  }

  @Get()
  async myOrders(@Request() req, @Query('debugUserId') debugUserId?: string) {
    try {
      console.log('GET /orders called by', req.user);
    } catch (e) {
      // ignore
    }

    if (process.env.DEBUG_ORDERS === 'true' && debugUserId) {
      const uid = Number(debugUserId);
      if (!Number.isNaN(uid)) {
        console.log('Using debugUserId override for orders:', uid);
        return this.ordersService.listUserOrders(uid);
      }
    }

    return this.ordersService.listUserOrders(req.user.userId);
  }
}
