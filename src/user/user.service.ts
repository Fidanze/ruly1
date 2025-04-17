import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/user/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto
    });
  }

  findAll(role?: string, full_name?: string, efficiency?: number) {
    const query = { where: {} } as { where: Record<string, any> }
    if (role !== undefined && role !== '') {
      query.where.role = role
    }
    if (full_name !== undefined && full_name !== '') {
      query.where.full_name = full_name
    }
    if (efficiency !== undefined) {
      query.where.efficiency = efficiency
    }

    if (Object.keys(query.where).length) {
      return this.prisma.user.findMany(query)
    }
    return this.prisma.user.findMany()
  }

  findOne(id: number) {
    return this.prisma.user.findFirstOrThrow({ where: { id } })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: updateUserDto })
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } })
  }

  removeAll() {
    return this.prisma.user.deleteMany({})
  }
}
