import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '../../prisma/client';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  async create(data: CreatePostDto) {
    return prisma.post.create({
      data: {
        author_vid: data.author_vid,
        title: data.title,
        content: data.content,
        tags: data.tags ?? ['page'],
        isPublic: data.isPublic ?? true,
      },
    });
  }

  async findAll() {
    return prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException('Post não encontrado');
    }

    return post;
  }

  async update(id: number, data: UpdatePostDto) {
    await this.findOne(id);

    return prisma.post.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return prisma.post.delete({
      where: { id },
    });
  }
}
