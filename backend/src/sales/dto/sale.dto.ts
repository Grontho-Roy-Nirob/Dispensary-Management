import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  Min,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';

export class SaleItemDTO {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  medicineId!: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  quantity!: number;
}

export class SaleDTO {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => SaleItemDTO)
  items!: SaleItemDTO[];
}