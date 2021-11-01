import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './orm.config';
import { UserController } from './routes/users/users.controller';
import { UserService } from './routes/users/users.service';
import { HttpModule } from '@nestjs/axios';
import { StripService } from './routes/strip/strip.service';
import { StripController } from './routes/strip/strip.controller';
import { MailgunController } from './routes/mailgun/mailgun.controller';
import { MailgunService } from './routes/mailgun/mailgun.service';
import { CartController } from './routes/cart/cart.controller';
import { CartService } from './routes/cart/cart.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.default.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(config),
    HttpModule,
  ],
  controllers: [
    AppController,
    UserController,
    StripController,
    MailgunController,
    CartController,
  ],
  providers: [
    AppService,
    UserService,
    StripService,
    MailgunService,
    CartService,
  ],
})
export class AppModule {}
