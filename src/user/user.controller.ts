import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('/create')
  async create(@Body() createUserDto: CreateUserDto) {
    return { id: (await this.userService.create(createUserDto)).id }
  }

  @Get('/get')
  async findAll(
    @Query('role') role?: string,
    @Query('full_name') full_name?: string,
    @Query('efficiency', new ParseIntPipe({ optional: true })) efficiency?: number,
  ) {
    const users = await this.userService.findAll(role, full_name, efficiency);
    return { users }
  }

  @Get('/get/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOne(id);
    return { users: [user] }
  }

  @Patch('/update/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('/delete/')
  async removeAll() {
    await this.userService.removeAll();
  }

  @Delete('/delete/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
