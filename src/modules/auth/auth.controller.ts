import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './local/local-auth.guard';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { RoleGuard } from './roles/role.guard';
import { Roles } from './roles/roles.decorator';
import { UserRoleEnum } from '../user/enums/user-role.enum';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Логин' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'playerone@gmail.com',
          description: 'Username of a user',
        },
        password: {
          type: 'string',
          example: 'Player01',
          description: 'Password of a user',
        },
      },
    },
  })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Roles(UserRoleEnum.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiBearerAuth()
  @Get('profile')
  @ApiOperation({ summary: 'Получение профиля пользователя' })
  getProfile(@Request() req) {
    return req.user;
  }
}