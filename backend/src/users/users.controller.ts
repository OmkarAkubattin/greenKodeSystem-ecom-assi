import {
  Controller,
  Get,
  Patch,
  Body,
  UseGuards,
  Request,
  Param,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { IsOptional, IsString } from 'class-validator';

class UpdateProfileDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  mobile?: string;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Return current user's profile
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Request() req: any) {
    const userId = req.user?.userId || req.user?.sub;
    return this.usersService.findById(userId);
  }

  // Update current user's profile
  @UseGuards(JwtAuthGuard)
  @Patch('me')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async updateMe(@Request() req: any, @Body() body: UpdateProfileDto) {
    const userId = req.user?.userId || req.user?.sub;
    return this.usersService.updateProfile(userId, body as any);
  }

  // Get user by id (guarded)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById(id);
  }
}
