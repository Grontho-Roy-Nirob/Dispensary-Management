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

import { AuthGuard } from '../user/auth/auth.guard.js';
import { SalesService } from './sales.service.js';
import { SaleDTO } from './dto/sale.dto.js';

@Controller('api/sales')
@UseGuards(AuthGuard)
export class SalesController {
  constructor(private salesService: SalesService) {}

  // POST /api/sales
  @Post()
  @UsePipes(new ValidationPipe())
  createSale(
    @Body() data: SaleDTO, @Req()
    req: {
      user: {
        sub: number;
        email: string;
      };
    },
  ) {
    return this.salesService.createSale(data, req.user.sub);
  }

  // GET /api/sales/1
  @Get(':saleId')
  getSaleById(@Param('saleId', ParseIntPipe) saleId: number) {
    return this.salesService.getSaleById(saleId);
  }
}
