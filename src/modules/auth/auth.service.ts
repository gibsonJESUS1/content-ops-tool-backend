import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';

type RegisterResponse = {
  message: string;
  data: RegisterDto;
};

@Injectable()
export class AuthService {
  register(data: RegisterDto): RegisterResponse {
    return {
      message: 'User registered',
      data,
    };
  }
}
