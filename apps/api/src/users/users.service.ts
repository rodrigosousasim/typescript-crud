import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '../../prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  async create(data: CreateUserDto) {
    return prisma.user.create({
      data: {
        vid: data.vid,
        email: data.email,
        name: data.name,
        roles: data.roles ?? ['user'],
        isActive: data.isActive ?? true,
      },
    });
  }

  async findAll() {
    return prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOneById(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findOneByVid(vid: number) {
    const user = await prisma.user.findUnique({
      where: { vid },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: number, data: UpdateUserDto) {
    await this.findOneById(id);

    return prisma.user.update({
      where: { id },
      data: {
        email: data.email,
        name: data.name,
        roles: data.roles,
        isActive: data.isActive,
      },
    });
  }

  async remove(id: number) {
    await this.findOneById(id);

    return prisma.user.delete({
      where: { id },
    });
  }
}
