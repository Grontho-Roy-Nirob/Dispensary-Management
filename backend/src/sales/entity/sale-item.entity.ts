
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
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne('SaleEntity', 'items', {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'sale_id' })
  sale!: SaleEntity;

  @ManyToOne('MedicineEntity', 'saleItems', {
    nullable: false,
  })
  @JoinColumn({ name: 'medicine_id' })
  medicine!: MedicineEntity;

  @Column({ type: 'int' })
  quantity!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unit_price!: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  subtotal!: number;
}
