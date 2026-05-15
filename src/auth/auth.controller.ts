import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

import { JwtAuthGuard } from './strategies/guards/jwt-auth.guard';

import { CurrentUser } from './decorators/current-user.decorator';
import { Roles } from './decorators/roles.decorator';

import { AuthenticatedUser } from './types/authenticated-user.type';

import { RolesGuard } from './guards/roles.guard';
import { IsString } from 'class-validator';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

export class RefreshTokenDto {
  @IsString()
  refreshToken!: string;
}
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
  @ApiOperation({
    summary: 'Authenticate user',
  })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
  })
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(
    @CurrentUser()
    user: AuthenticatedUser,
  ) {
    return user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('admin')
  adminOnlyRoute() {
    return {
      message: 'Welcome Admin',
    };
  }

  @Post('refresh')
  refresh(
    @Body()
    refreshTokenDto: RefreshTokenDto,
  ) {
    return this.authService.refresh(refreshTokenDto);
  }
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout(
    @CurrentUser()
    user: AuthenticatedUser,
  ) {
    return this.authService.logout(user.userId);
  }
}
