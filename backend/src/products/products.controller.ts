import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsInt,
  Min,
  IsPositive,
} from 'class-validator';

class CreateProductDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  price: number;

  @IsString()
  stock: number;

  @IsOptional()
  @IsString()
  image_url?: string;
}

class ReduceStockDto {
  @IsInt()
  @Min(1)
  qty: number;
}

@Controller('products')
export class ProductsController {
  constructor(private readonly svc: ProductsService) {}

  @Get()
  list() {
    return this.svc.list();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.svc.findById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() body: CreateProductDto) {
    // Ensure numeric fields are proper types when transform is not globally enabled
    if (typeof body.price === 'string')
      body.price = parseFloat(body.price as any);
    if (typeof body.stock === 'string')
      body.stock = parseInt(body.stock as any, 10);
    return this.svc.create(body as any);
  }

  @Post(':id/reduce-stock')
  @UsePipes(new ValidationPipe({ transform: true }))
  async reduceStock(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ReduceStockDto,
  ) {
    if (!body || !body.qty || body.qty <= 0)
      throw new BadRequestException('qty is required and must be > 0');
    return this.svc.reduceStock(id, body.qty);
  }
}
