// import {
//   IsNotEmpty,
//   IsString,
//   IsNumber,
//   IsInt,
//   Min,
//   MaxLength,
// } from 'class-validator';

// export class MedicineDTO {
//   @IsNotEmpty()
//   @IsString()
//   @MaxLength(150)
//   name!: string;

//   @IsNotEmpty()
//   @IsString()
//   @MaxLength(150)
//   generic_name!: string;

//   @IsNumber({ maxDecimalPlaces: 2 })
//   @Min(0)
//   price!: number;

//   @IsInt()
//   @Min(0)
//   stock_quantity!: number;
// }

import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsInt,
  Min,
  MaxLength,
} from 'class-validator';

export class MedicineDTO {
  @ApiProperty({
    example: 'Napa',
    description: 'Name of the medicine',
    maxLength: 150,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  name!: string;

  @ApiProperty({
    example: 'Paracetamol',
    description: 'Generic name of the medicine',
    maxLength: 150,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  generic_name!: string;

  @ApiProperty({
    example: 2.5,
    description: 'Medicine price; must be non-negative',
    minimum: 0,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price!: number;

  @ApiProperty({
    example: 100,
    description: 'Available stock quantity',
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  stock_quantity!: number;
}
