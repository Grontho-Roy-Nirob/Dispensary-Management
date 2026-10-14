import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsInt,
  Min,
  MaxLength,
} from 'class-validator';

export class MedicineDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  name!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  generic_name!: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price!: number;

  @IsInt()
  @Min(0)
  stock_quantity!: number;
}