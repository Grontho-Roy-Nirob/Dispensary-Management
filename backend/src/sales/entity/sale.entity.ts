
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import type { UserEntity } from '../../user/entity/user.entity.js';
import type { SaleItemEntity } from './sale-item.entity.js';

@Entity('sales')
export class SaleEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  total_amount!: number;

  @ManyToOne('UserEntity', 'sales', {
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;

  @OneToMany('SaleItemEntity', 'sale', {
    cascade: true,
  })
  items!: SaleItemEntity[];

  @CreateDateColumn({ name: 'created_at' })
  created_at!: Date;
}
