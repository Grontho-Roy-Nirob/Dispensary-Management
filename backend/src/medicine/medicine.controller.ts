// import {
//   Body,
//   Controller,
//   Get,
//   Post,
//   Query,
//   UseGuards,
//   UsePipes,
//   ValidationPipe,
// } from '@nestjs/common';
// import { MedicineService } from './medicine.service.js';
// import { AuthGuard } from '../user/auth/auth.guard.js';
// import { MedicineDTO } from './dto/create-medicine.dto.js';
// import { MedicineEntity } from './entity/medicine.entity.js';

// @Controller('api/medicines')
// export class MedicineController {
//   constructor(private medicineService: MedicineService) {}

//   // POST /api/medicines
//   @Post()
//   @UseGuards(AuthGuard)
//   @UsePipes(new ValidationPipe())
//   addMedicine(@Body() data: MedicineDTO): Promise<MedicineEntity> {
//     return this.medicineService.addMedicine(data);
//   }

//   // GET /api/medicines
//   // GET /api/medicines?search=paracetamol
//   @Get()
//   @UseGuards(AuthGuard)
//   getAllMedicines(@Query('search') search?: string): Promise<MedicineEntity[]> {
//     return this.medicineService.getAllMedicines(search);
//   }
// }

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
import {
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

import { MedicineService } from './medicine.service.js';
import { AuthGuard } from '../user/auth/auth.guard.js';
import { MedicineDTO } from './dto/create-medicine.dto.js';
import { MedicineEntity } from './entity/medicine.entity.js';

@ApiTags('Medicines')
@ApiBearerAuth('JWT-auth')
@Controller('api/medicines')
export class MedicineController {
  constructor(private medicineService: MedicineService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Add a new medicine' })
  @ApiCreatedResponse({
    description: 'Medicine created successfully.',
    type: MedicineEntity,
  })
  @ApiBadRequestResponse({
    description: 'Invalid medicine data.',
  })
  @ApiUnauthorizedResponse({
    description: 'Missing or invalid JWT.',
  })
  addMedicine(@Body() data: MedicineDTO): Promise<MedicineEntity> {
    return this.medicineService.addMedicine(data);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Get all medicines or search by medicine name',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    example: 'Napa',
    description: 'Search medicine names, case-insensitively.',
  })
  @ApiOkResponse({
    description: 'Returns the list of medicines.',
    type: MedicineEntity,
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: 'Missing or invalid JWT.',
  })
  getAllMedicines(@Query('search') search?: string): Promise<MedicineEntity[]> {
    return this.medicineService.getAllMedicines(search);
  }
}
