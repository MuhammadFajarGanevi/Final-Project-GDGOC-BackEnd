import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from '../../user/entities/user.entity';
import { Item } from '../../book/entities/item.entity';

@Entity('readings')
export class Reading {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.readings, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Item, (item) => item.readings, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'item_id' })
  item: Item;

  @Column({ default: 0 })
  read_page: number;

  @Column({ default: true })
  reading: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
