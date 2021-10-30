import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './orm.config';
import { UserController } from './routes/users/users.controller';
import { UserService } from './routes/users/users.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.default.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(config),
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
