import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { UserService } from './user.service.js';
import { AuthGuard } from './auth/auth.guard.js';

@ApiTags('Users')
@ApiBearerAuth('JWT-auth')
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({
    description: 'Returns the list of users without password fields.',
  })
  @ApiUnauthorizedResponse({
    description: 'Authentication required.',
  })
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get the authenticated user profile' })
  @ApiOkResponse({
    description: 'Returns the authenticated user profile.',
  })
  @ApiUnauthorizedResponse({
    description: 'Authentication required.',
  })
  getProfile(@Req() req: any) {
    return this.userService.getProfile(req.user.sub);
  }
}
