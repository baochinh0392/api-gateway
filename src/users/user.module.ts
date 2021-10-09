import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from "@nestjs/microservices";
import { UsersController } from './users.controller';
import { UserService } from './user.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: "USER_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_URL],
          queue: 'users_queue',
          queueOptions: {
            durable: false
          },
        },
      }
    ])
  ],
  controllers: [UsersController],
  providers: [UserService],
})
export class UserModule {}
