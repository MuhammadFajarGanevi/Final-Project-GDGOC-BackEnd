import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  //   Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.userService.getById(+id);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.userService.delete(+id);
  }
}
