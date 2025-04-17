import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('/create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('/get')
  findAll(
    @Query('role') role?: string,
    @Query('full_name') full_name?: string,
    @Query('efficiency', ParseIntPipe) efficiency?: number,
  ) {
    return this.userService.findAll(role, full_name, efficiency);
  }

  // @Get('/get/:id')
  // findOne(@Param('id') id: string) {
  //   try {
  //     return this.userService.findOne(+id);
  //   }
  //   catch (e) {
  //     return new HttpException(`there is no user with id = ${id}`, HttpStatus.NOT_FOUND)
  //   }
  // }

  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete('/delete')
  async removeAll() {
    await this.userService.removeAll();
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
