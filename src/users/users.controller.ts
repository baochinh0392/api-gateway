import {
  Controller,
  Body, Get, Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './createUser.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get("/ping-user")
  pingServiceUser() {
    return this.userService.pingServiceUser();
  }

  @Post("/register")
  async registerUser(@Body() createUserDto: CreateUserDto) {    
    return this.userService.registerUser(createUserDto);
  }
}
