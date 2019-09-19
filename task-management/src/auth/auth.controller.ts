import {
  Body,
  ConflictException,
  Controller,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  public async signUp(
    @Res() res: Response,
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ) {
    try {
      await this.authService.signUp(authCredentialsDto);
      return res.status(HttpStatus.OK).json(['User created successfully']);
    } catch (error) {
      if (error.code === '23505' || 23505) {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }
}
