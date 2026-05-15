import { IsEnum, IsOptional, IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';
import { ContentStatus } from '@prisma/client';

export class QueryContentDto {
  @IsOptional()
  @IsEnum(ContentStatus)
  status?: ContentStatus;

  @IsOptional()
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? parseInt(value, 10) : value,
  )
  @IsPositive()
  page = 1;

  @IsOptional()
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? parseInt(value, 10) : value,
  )
  @IsPositive()
  limit = 10;
}
