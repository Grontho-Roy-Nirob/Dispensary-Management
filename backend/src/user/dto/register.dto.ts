// import {
//   IsEmail,
//   IsNotEmpty,
//   IsString,
//   MinLength,
//   MaxLength,
// } from 'class-validator';

// export class RegisterDTO {
//   @IsNotEmpty()
//   @IsString()
//   @MaxLength(100)
//   name!: string;

//   @IsNotEmpty()
//   @IsEmail()
//   @MaxLength(150)
//   email!: string;

//   @IsNotEmpty()
//   @IsString()
//   @MinLength(6)
//   password!: string;
// }


import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';

export class RegisterDTO {
  @ApiProperty({
    example: 'Rahim Uddin',
    description: 'Full name of the user',
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name!: string;

  @ApiProperty({
    example: 'rahim@example.com',
    description: 'Unique email address',
    maxLength: 150,
  })
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(150)
  email!: string;

  @ApiProperty({
    example: 'StrongPass123!',
    description: 'Password with at least 6 characters',
    minLength: 6,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password!: string;
}
