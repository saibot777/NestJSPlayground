import {
  Body,
  ConflictException,
  Controller,
  InternalServerErrorException,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  public async signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ) {
    return this.authService.signUp(authCredentialsDto);
  }
}
