import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'tosin@example.com',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'StrongPassword123',
  })
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiProperty({
    example: 'Tosin',
    required: false,
  })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({
    example: 'Owolabi',
    required: false,
  })
  @IsOptional()
  @IsString()
  lastName?: string;
}
