import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MedicineService } from './medicine.service.js';
import { AuthGuard } from '../user/auth/auth.guard.js';
import { MedicineDTO } from './dto/create-medicine.dto.js';
import { MedicineEntity } from './entity/medicine.entity.js';

@Controller('api/medicines')
export class MedicineController {
  constructor(private medicineService: MedicineService) {}

  // POST /api/medicines
  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  addMedicine(@Body() data: MedicineDTO): Promise<MedicineEntity> {
    return this.medicineService.addMedicine(data);
  }

  // GET /api/medicines
  // GET /api/medicines?search=paracetamol
  @Get()
  @UseGuards(AuthGuard)
  getAllMedicines(@Query('search') search?: string): Promise<MedicineEntity[]> {
    return this.medicineService.getAllMedicines(search);
  }
}
