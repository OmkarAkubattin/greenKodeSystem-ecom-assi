import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../entity/user.entity';
import { OrderItem } from '../entity/order-item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (u) => u.orders)
  user: User;

  @Column()
  customerName: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column('decimal', { precision: 12, scale: 2 })
  total: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => OrderItem, (item) => item.order, {
    cascade: true,
    eager: true,
  })
  items: OrderItem[];
}
