// import {
//   Body,
//   Controller,
//   Get,
//   Post,
//   Param,
//   ParseIntPipe,
//   Req,
//   UseGuards,
//   UsePipes,
//   ValidationPipe,
// } from '@nestjs/common';

// import type { Request } from 'express';

// import { AuthGuard } from '../user/auth/auth.guard.js';
// import { SalesService } from './sales.service.js';
// import { SaleDTO } from './dto/sale.dto.js';

// @Controller('api/sales')
// @UseGuards(AuthGuard)
// export class SalesController {
//   constructor(private salesService: SalesService) {}

//   // POST /api/sales
//   @Post()
//   @UsePipes(new ValidationPipe())
//   createSale(
//     @Body() data: SaleDTO, @Req()
//     req: {
//       user: {
//         sub: number;
//         email: string;
//       };
//     },
//   ) {
//     return this.salesService.createSale(data, req.user.sub);
//   }

//   // GET /api/sales/1
//   @Get(':saleId')
//   getSaleById(@Param('saleId', ParseIntPipe) saleId: number) {
//     return this.salesService.getSaleById(saleId);
//   }
// }

import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import type { Request } from 'express';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AuthGuard } from '../user/auth/auth.guard.js';
import { SalesService } from './sales.service.js';
import { SaleDTO } from './dto/sale.dto.js';

@ApiTags('Sales')
@ApiBearerAuth('JWT-auth')
@Controller('api/sales')
@UseGuards(AuthGuard)
export class SalesController {
  constructor(private salesService: SalesService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({
    summary: 'Create a sale',
    description:
      'Calculates the sale total from database prices and deducts medicine stock.',
  })
  @ApiBody({ type: SaleDTO })
  @ApiCreatedResponse({
    description: 'Sale created successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid sale data or insufficient stock.',
  })
  @ApiNotFoundResponse({
    description: 'User or medicine not found.',
  })
  @ApiUnauthorizedResponse({
    description: 'Missing or invalid JWT.',
  })
  createSale(
    @Body() data: SaleDTO,
    @Req()
    req: Request & {
      user: {
        sub: number;
        email: string;
      };
    },
  ) {
    return this.salesService.createSale(data, req.user.sub);
  }

  @Get(':saleId')
  @ApiOperation({ summary: 'Get sale details by ID' })
  @ApiParam({
    name: 'saleId',
    type: Number,
    example: 1,
    description: 'Numeric ID of the sale.',
  })
  @ApiOkResponse({
    description: 'Sale details retrieved successfully.',
  })
  @ApiNotFoundResponse({
    description: 'Sale not found.',
  })
  @ApiUnauthorizedResponse({
    description: 'Missing or invalid JWT.',
  })
  getSaleById(@Param('saleId', ParseIntPipe) saleId: number) {
    return this.salesService.getSaleById(saleId);
  }
}
