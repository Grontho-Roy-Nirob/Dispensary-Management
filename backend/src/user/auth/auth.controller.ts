//

import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AuthService } from './auth.service.js';
import { RegisterDTO } from '../dto/register.dto.js';
import { LoginDTO } from '../dto/login.dto.js';
import { AuthGuard } from './auth.guard.js';

@ApiTags('Authentication')
@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterDTO })
  @ApiCreatedResponse({
    description: 'Registration successful. Returns user details.',
  })
  @ApiConflictResponse({
    description: 'Email already exists.',
  })
  @UsePipes(new ValidationPipe())
  register(@Body() data: RegisterDTO) {
    return this.authService.register(data);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login and obtain a JWT access token' })
  @ApiBody({ type: LoginDTO })
  @ApiCreatedResponse({
    description: 'Login successful. Returns access_token and user details.',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid email or password.',
  })
  @UsePipes(new ValidationPipe())
  login(@Body() data: LoginDTO) {
    return this.authService.login(data);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout the authenticated user' })
  @ApiBearerAuth('JWT-auth')
  @ApiCreatedResponse({
    description: 'Logout message returned.',
  })
  @ApiUnauthorizedResponse({
    description: 'Authentication token missing, invalid or expired.',
  })
  @UseGuards(AuthGuard)
  logout() {
    return this.authService.logout();
  }
}
