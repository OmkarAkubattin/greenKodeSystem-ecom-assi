import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  @Header(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate',
  )
  @Header('Pragma', 'no-cache')
  @Header('Expires', '0')
  async getCart(@Request() req) {
    return this.cartService.getCart(req.user.userId);
  }

  @Post('add')
  async add(
    @Request() req,
    @Body() body: { productId: number; quantity?: number },
  ) {
    return this.cartService.addToCart(
      req.user.userId,
      body.productId,
      body.quantity || 1,
    );
  }

  @Put(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() body: { quantity: number },
  ) {
    return this.cartService.updateQuantity(
      req.user.userId,
      Number(id),
      body.quantity,
    );
  }

  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    return this.cartService.removeItem(req.user.userId, Number(id));
  }
}
