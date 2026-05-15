import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { ContentService } from './content.service';

import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { QueryContentDto } from './dto/query-content.dto';

import { JwtAuthGuard } from '../auth/strategies/guards/jwt-auth.guard';

import { CurrentUser } from '../auth/decorators/current-user.decorator';

import { AuthenticatedUser } from '../auth/types/authenticated-user.type';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body()
    createContentDto: CreateContentDto,

    @CurrentUser()
    user: AuthenticatedUser,
  ) {
    return this.contentService.create(createContentDto, user);
  }

  @Get()
  findAll(
    @Query()
    queryDto: QueryContentDto,
  ) {
    return this.contentService.findAll(queryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,

    @Body()
    updateContentDto: UpdateContentDto,

    @CurrentUser()
    user: AuthenticatedUser,
  ) {
    return this.contentService.update(id, updateContentDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('id') id: string,

    @CurrentUser()
    user: AuthenticatedUser,
  ) {
    return this.contentService.remove(id, user);
  }
}
