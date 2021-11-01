import { Injectable } from '@nestjs/common';
import { cart } from 'src/entities/cart.entity';
import { users_user } from 'src/entities/users_user.entity';
import { getConnection } from 'typeorm';

@Injectable()
export class CartService {
  async addToCart(item: any, user_id: number) {
    const user = await getConnection()
      .getRepository(users_user)
      .findOne({ id: user_id });

    return await getConnection().getRepository(cart).insert({
      items: item,
      user_: user,
    });
  }

  async getCart(user_id: number) {
    const user = await getConnection()
      .getRepository(users_user)
      .findOne({ id: user_id });

    return await getConnection()
      .getRepository(cart)
      .find({ user_: user, active: true });
  }

  async removeCart(id) {
    let cartData = await getConnection()
      .getRepository(cart)
      .findOne({ id: id });

    cartData.active = false;

    getConnection().getRepository(cart).save(cartData);
  }

  async deleteCart(id: number) {
    return await getConnection().getRepository(cart).delete({ id: id });
  }
}
