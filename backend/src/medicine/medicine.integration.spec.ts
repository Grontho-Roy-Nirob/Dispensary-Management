import 'dotenv/config';

import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MedicineService } from './medicine.service.js';
import { MedicineEntity } from './entity/medicine.entity.js';

import { SaleEntity } from '../sales/entity/sale.entity.js';
import { SaleItemEntity } from '../sales/entity/sale-item.entity.js';
import { UserEntity } from '../user/entity/user.entity.js';

describe('Medicine Integration Tests', () => {
  let moduleFixture: TestingModule | undefined;

  let service: MedicineService;

  let medicineRepository: Repository<MedicineEntity>;
  let saleItemRepository: Repository<SaleItemEntity>;

  beforeAll(async () => {
    const dbPassword = process.env.DB_PASSWORD;

    if (!dbPassword) {
      throw new Error('DB_PASSWORD don\'t found. Check backend/.env file.');
    }

    moduleFixture = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DB_HOST || 'localhost',
          port: Number(process.env.DB_PORT || 5432),
          username: process.env.DB_USERNAME || 'postgres',
          password: dbPassword,
          database: 'MedicineDB',

          entities: [MedicineEntity, SaleEntity, SaleItemEntity, UserEntity],

          synchronize: true,
          retryAttempts: 1,
          retryDelay: 1000,
        }),

        TypeOrmModule.forFeature([
          MedicineEntity,
          SaleEntity,
          SaleItemEntity,
          UserEntity,
        ]),
      ],

      providers: [MedicineService],
    }).compile();

    await moduleFixture.init();

    service = moduleFixture.get<MedicineService>(MedicineService);

    medicineRepository = moduleFixture.get<Repository<MedicineEntity>>(
      getRepositoryToken(MedicineEntity),
    );

    saleItemRepository = moduleFixture.get<Repository<SaleItemEntity>>(
      getRepositoryToken(SaleItemEntity),
    );
  });

  beforeEach(async () => {
    await saleItemRepository.createQueryBuilder().delete().execute();
    await medicineRepository.createQueryBuilder().delete().execute();
  });

  afterAll(async () => {
    if (moduleFixture) {
      await moduleFixture.close();
    }
  });

  // Test 1: PostgreSQL medicine save 
  it('should save a medicine in PostgreSQL', async () => {
    const medicineData = {
      name: 'Napa',
      generic_name: 'Paracetamol',
      price: 10,
      stock_quantity: 20,
    };

    const savedMedicine = await service.addMedicine(medicineData);

    expect(savedMedicine.id).toBeDefined();
    expect(savedMedicine.name).toBe('Napa');
    expect(savedMedicine.generic_name).toBe('Paracetamol');
    expect(Number(savedMedicine.price)).toBe(10);
    expect(savedMedicine.stock_quantity).toBe(20);
  });

  // Test 2: PostgreSQL medicines
  it('should retrieve medicines from PostgreSQL', async () => {
    await service.addMedicine({
      name: 'Napa',
      generic_name: 'Paracetamol',
      price: 10,
      stock_quantity: 20,
    });

    const medicines = await service.getAllMedicines();

    expect(medicines).toHaveLength(1);
    expect(medicines[0].name).toBe('Napa');
  });

  // Test 3: Search By Medicine Name
  it('should search medicines by name in PostgreSQL', async () => {
    await service.addMedicine({
      name: 'Napa',
      generic_name: 'Paracetamol',
      price: 10,
      stock_quantity: 20,
    });

    await service.addMedicine({
      name: 'Seclo',
      generic_name: 'Omeprazole',
      price: 7,
      stock_quantity: 15,
    });

    const medicines = await service.getAllMedicines('napa');

    expect(medicines).toHaveLength(1);
    expect(medicines[0].name).toBe('Napa');
  });

  // Test 4: show empty list
  it('should return an empty list for an unmatched search', async () => {
    await service.addMedicine({
      name: 'Napa',
      generic_name: 'Paracetamol',
      price: 10,
      stock_quantity: 20,
    });

    const medicines = await service.getAllMedicines('unknown-medicine');

    expect(medicines).toHaveLength(0);
  });
});
