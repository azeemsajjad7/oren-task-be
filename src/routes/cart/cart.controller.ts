import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { CartService } from './cart.service';

@Controller('cart')
@UseGuards(AuthGuard)
export class CartController {
  constructor(private cartService: CartService) {}

  @Post('add')
  async addToCart(@Req() req) {
    return await this.cartService.addToCart(req.body.item, req.decoded.user_id);
  }

  @Get()
  async getCart(@Req() req) {
    return await this.cartService.getCart(req.decoded.user_id);
  }

  @Put('/:id')
  async deleteCart(@Param() param) {
    return await this.cartService.deleteCart(param.id);
  }

  @Put('remove/:id')
  async removeCart(@Param() param) {
    return await this.cartService.removeCart(param.id);
  }
}
