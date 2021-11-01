import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';
import * as querystring from 'querystring';
import { CreateOrderBody } from './strip.dto';
import { getConnection } from 'typeorm';
import { payments } from 'src/entities/payments.entity';

@Injectable()
export class StripService {
  constructor(private httpService: HttpService) {}

  async createOrder(
    createOrderBody: CreateOrderBody,
    username: string,
    address: object,
  ) {
    return await this.httpService
      .post(
        'https://api.stripe.com/v1/charges',
        querystring.stringify({
          amount: createOrderBody.amount * 100,
          currency: process.env.STRIP_CURRENCY,
          source: 'tok_visa',
          description: createOrderBody.description,
          'shipping[name]': username,
          'shipping[address][line1]': address['street_name'],
          'shipping[address][postal_code]': address['pincode'] || null,
          'shipping[address][city]': address['city'] || null,
          'shipping[address][state]': address['state'] || null,
          'shipping[address][country]': address['country'] || null,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          auth: {
            username: process.env.STRIP_API_KEY,
            password: null,
          },
        },
      )
      .pipe(
        map((res) => {
          getConnection().getRepository(payments).insert({
            order_id: res.data.id,
            payment_gateway: 'strip',
            payment_response: res.data,
            status: 'order_created',
            created_on: new Date(),
            updated_on: new Date(),
          });
          return res.data ? { success: true } : { success: false };
        }),
      );
  }
}
