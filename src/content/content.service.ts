import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { Content } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

import { AuthenticatedUser } from '../auth/types/authenticated-user.type';

import { CreateContentDto } from './dto/create-content.dto';
import { QueryContentDto } from './dto/query-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

import { ContentRepository } from './repositories/content.repository';

@Injectable()
export class ContentService {
  private readonly logger = new Logger(ContentService.name);

  constructor(
    private readonly prisma: PrismaService,

    private readonly contentRepository: ContentRepository,
  ) {}

  async create(
    createContentDto: CreateContentDto,

    user: AuthenticatedUser,
  ): Promise<Content> {
    this.logger.log(`Creating content for user: ${user.userId}`);

    return await this.contentRepository.create(user.userId, createContentDto);
  }

  async findAll(queryDto: QueryContentDto) {
    this.logger.log('Fetching content collection');

    return await this.contentRepository.findAll(queryDto);
  }

  async findOne(id: string) {
    this.logger.log(`Fetching content with ID: ${id}`);

    return await this.getContentOrThrow(id);
  }

  async update(
    id: string,

    updateContentDto: UpdateContentDto,

    user: AuthenticatedUser,
  ) {
    this.logger.log(`Updating content with ID: ${id}`);

    const content = await this.getContentOrThrow(id);

    const isOwner = content.authorId === user.userId;

    const isAdmin = user.role === 'ADMIN';

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException('You do not own this content');
    }

    return await this.contentRepository.update(id, updateContentDto);
  }

  async remove(
    id: string,

    user: AuthenticatedUser,
  ) {
    this.logger.warn(`Soft deleting content with ID: ${id}`);

    const content = await this.getContentOrThrow(id);

    const isOwner = content.authorId === user.userId;

    const isAdmin = user.role === 'ADMIN';

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException('You do not own this content');
    }

    return await this.contentRepository.delete(id);
  }

  private async getContentOrThrow(id: string) {
    const content = await this.contentRepository.findById(id);

    if (!content) {
      this.logger.warn(`Content not found with ID: ${id}`);

      throw new NotFoundException('Content not found');
    }

    return content;
  }
}
