// import {
//   ArrayMinSize,
//   IsArray,
//   IsInt,
//   IsNotEmpty,
//   Min,
//   ValidateNested,
// } from 'class-validator';

// import { Type } from 'class-transformer';

// export class SaleItemDTO {
//   @IsNotEmpty()
//   @IsInt()
//   @Min(1)
//   medicineId!: number;

//   @IsNotEmpty()
//   @IsInt()
//   @Min(1)
//   quantity!: number;
// }

// export class SaleDTO {
//   @IsArray()
//   @ArrayMinSize(1)
//   @ValidateNested({ each: true })
//   @Type(() => SaleItemDTO)
//   items!: SaleItemDTO[];
// }

import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    example: 1,
    description: 'ID of the medicine to sell',
    minimum: 1,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  medicineId!: number;

  @ApiProperty({
    example: 2,
    description: 'Quantity to sell',
    minimum: 1,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  quantity!: number;
}

export class SaleDTO {
  @ApiProperty({
    type: () => SaleItemDTO,
    isArray: true,
    minItems: 1,
    example: [
      {
        medicineId: 1,
        quantity: 2,
      },
    ],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => SaleItemDTO)
  items!: SaleItemDTO[];
}
