import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AppService } from "./app.service";
import { ConfigModule } from '@nestjs/config';
import { BlogModule } from './blogs/blog.module'
import { UserModule } from "./users/user.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    BlogModule,
    UserModule,
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
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}