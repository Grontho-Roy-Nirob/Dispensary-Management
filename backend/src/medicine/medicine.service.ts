import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicineEntity } from './entity/medicine.entity.js';
import { MedicineDTO } from './dto/create-medicine.dto.js';

@Injectable()
export class MedicineService {
  constructor(
    @InjectRepository(MedicineEntity)
    private medicineRepo: Repository<MedicineEntity>,
  ) {}

  async addMedicine(data: MedicineDTO): Promise<MedicineEntity> {
    const medicine = this.medicineRepo.create(data);
    return this.medicineRepo.save(medicine);
  }

  async getAllMedicines(search?: string): Promise<MedicineEntity[]> {
    const query = this.medicineRepo.createQueryBuilder('medicine');

    if (search && search.trim()) {
      query.where('medicine.name ILIKE :search', {
        search: `%${search.trim()}%`,
      });
    }

    return query.orderBy('medicine.id', 'DESC').getMany();
  }
}
