// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   CreateDateColumn,
//   OneToMany,
// } from 'typeorm';

// import type { SaleEntity } from '../../sales/entity/sale.entity.js';

// @Entity('users')
// export class UserEntity {
//   @PrimaryGeneratedColumn()
//   id!: number;

//   @Column({ type: 'varchar', length: 100 })
//   name!: string;

//   @Column({ type: 'varchar', length: 150, unique: true })
//   email!: string;

//   @Column({ type: 'varchar', length: 255 })
//   password!: string;

//   @CreateDateColumn({ name: 'created_at' })
//   created_at!: Date;

//   @OneToMany('SaleEntity', 'user')
//   sales!: SaleEntity[];
// }

import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

import type { SaleEntity } from '../../sales/entity/sale.entity.js';

@Entity('users')
export class UserEntity {
  @ApiProperty({ example: 1, description: 'Unique user ID' })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: 'Rahim Uddin' })
  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @ApiProperty({ example: 'rahim@example.com' })
  @Column({ type: 'varchar', length: 150, unique: true })
  email!: string;

  // Never expose this field in API responses.
  @Column({ type: 'varchar', length: 255, select: false })
  password!: string;

  @ApiProperty({
    example: '2026-10-27T10:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  @CreateDateColumn({ name: 'created_at' })
  created_at!: Date;

  @OneToMany('SaleEntity', 'user')
  sales!: SaleEntity[];
}
