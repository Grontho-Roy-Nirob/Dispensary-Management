import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SaleEntity } from './entity/sale.entity.js';
import { SaleDTO } from './dto/sale.dto.js';
import { MedicineEntity } from '../medicine/entity/medicine.entity.js';
import { SaleItemEntity } from './entity/sale-item.entity.js';
import { UserEntity } from '../user/entity/user.entity.js';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(SaleEntity)
    private saleRepo: Repository<SaleEntity>,

    @InjectRepository(MedicineEntity)
    private medicineRepo: Repository<MedicineEntity>,

    @InjectRepository(SaleItemEntity)
    private saleItemRepo: Repository<SaleItemEntity>,

    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async createSale(data: SaleDTO, userId: number) {
    // Find user
    const user = await this.userRepo.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Combine repeated medicines
    const quantityMap = new Map<number, number>();

    for (const item of data.items) {
      const currentQuantity = quantityMap.get(item.medicineId) || 0;

      quantityMap.set(item.medicineId, currentQuantity + item.quantity);
    }

    let totalAmount = 0;

    const saleItems: SaleItemEntity[] = [];

    // Process medicines
    for (const [medicineId, quantity] of quantityMap) {
      const medicine = await this.medicineRepo.findOne({
        where: { id: medicineId },
      });

      if (!medicine) {
        throw new NotFoundException(`Medicine ${medicineId} not found`);
      }

      if (quantity > medicine.stock_quantity) {
        throw new BadRequestException(
          `Insufficient stock for ${medicine.name}. Available stock: ${medicine.stock_quantity}`,
        );
      }

      const unitPrice = Number(medicine.price);

      const subtotal = Number((unitPrice * quantity).toFixed(2));

      totalAmount = Number((totalAmount + subtotal).toFixed(2));

      // Reduce stock
      medicine.stock_quantity -= quantity;

      await this.medicineRepo.save(medicine);

      // Create sale item
      const saleItem = this.saleItemRepo.create({
        sale: undefined,
        medicine,
        quantity,
        unit_price: unitPrice,
        subtotal,
      });

      saleItems.push(saleItem);
    }

    // Create sale
    const sale = this.saleRepo.create({
      user,
      total_amount: totalAmount,
    });

    const savedSale = await this.saleRepo.save(sale);

    // Attach sale to each item and save
    for (const item of saleItems) {
      item.sale = savedSale;
    }

    await this.saleItemRepo.save(saleItems);

    // Return sale with relations
    return this.saleRepo.findOne({
      where: { id: savedSale.id },
      relations: {
        user: true,
        items: {
          medicine: true,
        },
      },
    });
  }

  async getSaleById(saleId: number) {
    const sale = await this.saleRepo.findOne({
      where: { id: saleId },
      relations: {
        user: true,
        items: {
          medicine: true,
        },
      },
    });

    if (!sale) {
      throw new NotFoundException('Sale not found');
    }

    return sale;
  }
}
