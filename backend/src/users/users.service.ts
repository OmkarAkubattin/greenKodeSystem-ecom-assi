import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(data: Partial<User>) {
    const user = this.userRepo.create(data);
    return this.userRepo.save(user);
  }

  async findByEmail(email: string) {
    return this.userRepo.findOneBy({ email });
  }

  async findById(id: number) {
    const u = await this.userRepo.findOneBy({ id });
    if (!u) throw new NotFoundException('User not found');
    return u;
  }

  async updateProfile(id: number, changes: Partial<User>) {
    await this.userRepo.update(id, changes);
    return this.findById(id);
  }
}
