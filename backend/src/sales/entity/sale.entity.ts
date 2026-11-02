// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   CreateDateColumn,
//   ManyToOne,
//   OneToMany,
//   JoinColumn,
// } from 'typeorm';

// import type { UserEntity } from '../../user/entity/user.entity.js';
// import type { SaleItemEntity } from './sale-item.entity.js';

// @Entity('sales')
// export class SaleEntity {
//   @PrimaryGeneratedColumn()
//   id!: number;

//   @Column({ type: 'decimal', precision: 12, scale: 2 })
//   total_amount!: number;

//   @ManyToOne('UserEntity', 'sales', {
//     nullable: false,
//   })
//   @JoinColumn({ name: 'user_id' })
//   user!: UserEntity;

//   @OneToMany('SaleItemEntity', 'sale', {
//     cascade: true,
//   })
//   items!: SaleItemEntity[];

//   @CreateDateColumn({ name: 'created_at' })
//   created_at!: Date;
// }

import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    example: 1,
    description: 'Unique sale ID',
  })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({
    example: '25.00',
    description: 'Total sale amount',
  })
  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
  })
  total_amount!: number;

  @ManyToOne('UserEntity', 'sales', {
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;

  @ApiProperty({
    description: 'Items included in this sale',
    type: Object,
    isArray: true,
  })
  @OneToMany('SaleItemEntity', 'sale', {
    cascade: true,
  })
  items!: SaleItemEntity[];

  @ApiProperty({
    example: '2026-10-27T10:00:00.000Z',
    description: 'Date and time when the sale was created',
    type: String,
    format: 'date-time',
  })
  @CreateDateColumn({
    name: 'created_at',
  })
  created_at!: Date;
}
