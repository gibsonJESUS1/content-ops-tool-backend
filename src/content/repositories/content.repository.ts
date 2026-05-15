import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateContentDto } from '../dto/create-content.dto';
import { UpdateContentDto } from '../dto/update-content.dto';
import { QueryContentDto } from '../dto/query-content.dto';

@Injectable()
export class ContentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(authorId: string, dto: CreateContentDto) {
    return await this.prisma.content.create({
      data: {
        title: dto.title,
        body: dto.body,
        status: dto.status,
        authorId,
      },
    });
  }

  async findAll(queryDto: QueryContentDto) {
    const { status, page, limit } = queryDto;

    const skip = (page - 1) * limit;

    const where = {
      deletedAt: null,
      ...(status && { status }),
    };

    const contents = await this.prisma.content.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const total = await this.prisma.content.count({
      where,
    });

    return {
      data: contents,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string) {
    return await this.prisma.content.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  async update(id: string, dto: UpdateContentDto) {
    return await this.prisma.content.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: string) {
    return await this.prisma.content.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
