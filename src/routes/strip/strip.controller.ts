import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { CreateOrderBody } from './strip.dto';
import { StripService } from './strip.service';

@Controller('strip')
@UseGuards(AuthGuard)
export class StripController {
  constructor(private stripSerivce: StripService) {}

  @Post('create-order')
  async createOrder(@Body() createOrderBody: CreateOrderBody, @Req() req) {
    return await this.stripSerivce.createOrder(
      createOrderBody,
      req.decoded.username,
      req.decoded.address,
    );
  }
}
