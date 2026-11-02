import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MedicineService } from './medicine.service.js';
import { MedicineEntity } from './entity/medicine.entity.js';
import { MedicineDTO } from './dto/create-medicine.dto.js';

describe('MedicineService Unit Tests', () => {
  let service: MedicineService;

  const mockRepository = {
    create: vi.fn(),
    save: vi.fn(),
    createQueryBuilder: vi.fn(),
  };

  const mockQueryBuilder = {
    where: vi.fn(),
    orderBy: vi.fn(),
    getMany: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    mockRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);

    mockQueryBuilder.where.mockReturnValue(mockQueryBuilder);
    mockQueryBuilder.orderBy.mockReturnValue(mockQueryBuilder);

    service = new MedicineService(mockRepository as any);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Test 1: Create medicine
  it('should create and save a medicine', async () => {
    const data: MedicineDTO = {
      name: 'Napa',
      generic_name: 'Paracetamol',
      price: 10,
      stock_quantity: 20,
    };

    const createdMedicine = {
      id: 1,
      ...data,
    } as MedicineEntity;

    mockRepository.create.mockReturnValue(createdMedicine);
    mockRepository.save.mockResolvedValue(createdMedicine);

    const result = await service.addMedicine(data);

    expect(mockRepository.create).toHaveBeenCalledWith(data);
    expect(mockRepository.save).toHaveBeenCalledWith(createdMedicine);
    expect(result).toEqual(createdMedicine);
  });

  // Test 2: Get all medicines
  it('should return all medicines', async () => {
    const medicines = [
      {
        id: 1,
        name: 'Napa',
        generic_name: 'Paracetamol',
        price: 10,
        stock_quantity: 20,
      },
    ] as MedicineEntity[];

    mockQueryBuilder.getMany.mockResolvedValue(medicines);

    const result = await service.getAllMedicines();

    expect(mockRepository.createQueryBuilder).toHaveBeenCalledWith('medicine');

    expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith(
      'medicine.id',
      'DESC',
    );

    expect(result).toEqual(medicines);
  });

  // Test 3: Search by medicine name
  it('should search medicines by name', async () => {
    const medicines = [
      {
        id: 1,
        name: 'Napa',
        generic_name: 'Paracetamol',
        price: 10,
        stock_quantity: 20,
      },
    ] as MedicineEntity[];

    mockQueryBuilder.getMany.mockResolvedValue(medicines);

    const result = await service.getAllMedicines('  napa  ');

    expect(mockQueryBuilder.where).toHaveBeenCalledWith(
      'medicine.name ILIKE :search',
      { search: '%napa%' },
    );

    expect(result).toEqual(medicines);
  });

  // Test 4: Ignore empty search
  it('should not filter when search is empty', async () => {
    mockQueryBuilder.getMany.mockResolvedValue([]);

    await service.getAllMedicines('   ');

    expect(mockQueryBuilder.where).not.toHaveBeenCalled();
    expect(mockQueryBuilder.getMany).toHaveBeenCalled();
  });

  // Test 5: Handle repository error
  it('should propagate repository errors', async () => {
    mockRepository.create.mockReturnValue({ name: 'Napa' });

    mockRepository.save.mockRejectedValue(new Error('Database error'));

    await expect(
      service.addMedicine({
        name: 'Napa',
        generic_name: 'Paracetamol',
        price: 10,
        stock_quantity: 20,
      }),
    ).rejects.toThrow('Database error');
  });
});
