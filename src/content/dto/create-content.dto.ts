import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ContentStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContentDto {
  @ApiProperty({
    example: 'This is the title of my first content.',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    example: 'This is the body of my first content.',
  })
  @IsString()
  @IsNotEmpty()
  body!: string;

  @IsEnum(ContentStatus)
  status!: ContentStatus;
}
