// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToOne,
//   JoinColumn,
// } from 'typeorm';

// import type { SaleEntity } from './sale.entity.js';
// import type { MedicineEntity } from '../../medicine/entity/medicine.entity.js';

// @Entity('sale_items')
// export class SaleItemEntity {
//   @PrimaryGeneratedColumn()
//   id!: number;

//   @ManyToOne('SaleEntity', 'items', {
//     nullable: false,
//     onDelete: 'CASCADE',
//   })
//   @JoinColumn({ name: 'sale_id' })
//   sale!: SaleEntity;

//   @ManyToOne('MedicineEntity', 'saleItems', {
//     nullable: false,
//   })
//   @JoinColumn({ name: 'medicine_id' })
//   medicine!: MedicineEntity;

//   @Column({ type: 'int' })
//   quantity!: number;

//   @Column({ type: 'decimal', precision: 10, scale: 2 })
//   unit_price!: number;

//   @Column({ type: 'decimal', precision: 12, scale: 2 })
//   subtotal!: number;
// }

import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import type { SaleEntity } from './sale.entity.js';
import type { MedicineEntity } from '../../medicine/entity/medicine.entity.js';

@Entity('sale_items')
export class SaleItemEntity {
  @ApiProperty({
    example: 1,
    description: 'Unique sale item ID',
  })
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne('SaleEntity', 'items', {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'sale_id' })
  sale!: SaleEntity;

  @ApiProperty({
    description: 'Medicine associated with this sale item',
    type: Object,
  })
  @ManyToOne('MedicineEntity', 'saleItems', {
    nullable: false,
  })
  @JoinColumn({ name: 'medicine_id' })
  medicine!: MedicineEntity;

  @ApiProperty({
    example: 2,
    description: 'Quantity sold',
  })
  @Column({ type: 'int' })
  quantity!: number;

  @ApiProperty({
    example: '12.50',
    description: 'Price per unit at sale time',
  })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  unit_price!: number;

  @ApiProperty({
    example: '25.00',
    description: 'Total price for this item',
  })
  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
  })
  subtotal!: number;
}
