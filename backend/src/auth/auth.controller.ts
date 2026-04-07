import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser, JwtUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { CategoryDto } from './dto/category.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@CurrentUser() user: JwtUser) {
    return this.authService.validateUserById(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('categories')
  addCategory(@CurrentUser() user: JwtUser, @Body() dto: CategoryDto) {
    return this.authService.addCategory(user.userId, dto.category);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('categories/:category')
  removeCategory(
    @CurrentUser() user: JwtUser,
    @Param('category') category: string,
  ) {
    return this.authService.removeCategory(user.userId, decodeURIComponent(category));
  }
}
