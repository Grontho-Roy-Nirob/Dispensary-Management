import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MedicineController } from './medicine.controller.js';
import { MedicineService } from './medicine.service.js';
import { MedicineEntity } from './entity/medicine.entity.js';
import { AuthModule } from '../user/auth/auth.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([MedicineEntity]),
    AuthModule,
  ],
  controllers: [MedicineController],
  providers: [MedicineService],
  exports: [MedicineService],
})
export class MedicineModule {}