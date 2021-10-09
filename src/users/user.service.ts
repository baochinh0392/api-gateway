import { Injectable, Inject } from "@nestjs/common";
import {
  ClientProxy
} from '@nestjs/microservices';
import { CreateUserDto } from './createUser.dto';
import { map } from "rxjs/operators";

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE') private readonly clientServiceUser: ClientProxy
  ) {}

  pingServiceUser() {
    const startTs = Date.now();
    const pattern = { cmd: 'ping' };
    const payload = {};
    return this.clientServiceUser
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message, duration: Date.now() - startTs })),
      );
  }

  registerUser = (createUserDto: CreateUserDto) => {
    return this.clientServiceUser.send({ cmd: 'registerUser' }, createUserDto);
  };
}
