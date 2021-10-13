import {
  Controller,
  Body, Get, Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './createUser.dto';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';


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
  @ApiConsumes('application/json')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: "baochinh@gmail.com" },
        password: { type: 'string', example: "123456" },
        full_name: { type: 'string', example: "Bao Chinh" },
        dob: { type: 'string', example: "03-03-1992" }
      },
      required: ['email', 'password', 'full_name', 'dob']
    },
  })
  async registerUser(@Body() createUserDto: CreateUserDto) {    
    return this.userService.registerUser(createUserDto);
  }
}
