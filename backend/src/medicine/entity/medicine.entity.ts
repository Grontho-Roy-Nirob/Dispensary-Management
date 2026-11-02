// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   CreateDateColumn,
//   UpdateDateColumn,
//   OneToMany,
// } from 'typeorm';

// import type { SaleItemEntity } from '../../sales/entity/sale-item.entity.js';

// @Entity('medicines')
// export class MedicineEntity {
//   @PrimaryGeneratedColumn()
//   id!: number;

//   @Column({ type: 'varchar', length: 150 })
//   name!: string;

//   @Column({ type: 'varchar', length: 150 })
//   generic_name!: string;

//   @Column({ type: 'decimal', precision: 10, scale: 2 })
//   price!: number;

//   @Column({ type: 'int', default: 0 })
//   stock_quantity!: number;

//   @OneToMany('SaleItemEntity', 'medicine')
//   saleItems!: SaleItemEntity[];

//   @CreateDateColumn({ name: 'created_at' })
//   created_at!: Date;

//   @UpdateDateColumn({ name: 'updated_at' })
//   updated_at!: Date;
// }

import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import type { SaleItemEntity } from '../../sales/entity/sale-item.entity.js';

@Entity('medicines')
export class MedicineEntity {
  @ApiProperty({
    example: 1,
    description: 'Unique medicine ID',
  })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({
    example: 'Napa',
    description: 'Medicine name',
    maxLength: 150,
  })
  @Column({
    type: 'varchar',
    length: 150,
  })
  name!: string;

  @ApiProperty({
    example: 'Paracetamol',
    description: 'Generic name of the medicine',
    maxLength: 150,
  })
  @Column({
    type: 'varchar',
    length: 150,
  })
  generic_name!: string;

  @ApiProperty({
    example: 12.5,
    description: 'Medicine price',
    minimum: 0,
    type: Number,
  })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price!: number;

  @ApiProperty({
    example: 100,
    description: 'Available stock quantity',
    minimum: 0,
  })
  @Column({
    type: 'int',
    default: 0,
  })
  stock_quantity!: number;

  @OneToMany('SaleItemEntity', 'medicine')
  saleItems!: SaleItemEntity[];

  @ApiProperty({
    example: '2026-10-27T10:00:00.000Z',
    description: 'Date and time when the medicine was created',
    type: String,
    format: 'date-time',
  })
  @CreateDateColumn({
    name: 'created_at',
  })
  created_at!: Date;

  @ApiProperty({
    example: '2026-10-27T11:00:00.000Z',
    description: 'Date and time when the medicine was last updated',
    type: String,
    format: 'date-time',
  })
  @UpdateDateColumn({
    name: 'updated_at',
  })
  updated_at!: Date;
}
