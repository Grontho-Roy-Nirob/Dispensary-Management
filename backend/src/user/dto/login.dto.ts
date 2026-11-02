// import {
//   IsEmail,
//   IsNotEmpty,
//   IsString,
// } from 'class-validator';

// export class LoginDTO {
//   @IsNotEmpty()
//   @IsEmail()
//   email!: string;

//   @IsNotEmpty()
//   @IsString()
//   password!: string;
// }

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @ApiProperty({
    example: 'rahim@example.com',
    description: 'Registered email address',
  })
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'StrongPass123!',
    description: 'Account password',
  })
  @IsNotEmpty()
  @IsString()
  password!: string;
}
