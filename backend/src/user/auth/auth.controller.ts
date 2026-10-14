import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDTO } from '../dto/register.dto.js';
import { LoginDTO } from '../dto/login.dto.js';
import { AuthGuard } from './auth.guard.js';

@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() data: RegisterDTO) {
    return this.authService.register(data);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() data: LoginDTO) {
    return this.authService.login(data);
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  logout() {
    return this.authService.logout();
  }
}
