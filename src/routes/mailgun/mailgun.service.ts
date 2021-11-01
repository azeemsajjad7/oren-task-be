import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, of, switchMap } from 'rxjs';
import { mail } from 'src/entities/mail.entity';
import { users_user } from 'src/entities/users_user.entity';
import { getConnection } from 'typeorm';
var FormData = require('form-data');

@Injectable()
export class MailgunService {
  constructor(private httpService: HttpService) {}

  async sendMail(email: string, user_id: number) {
    const form = new FormData();
    form.append(
      'from',
      'mailgun@sandbox33ce8727b689499092c890efb9abea31.mailgun.org',
    );
    form.append('to', email);
    form.append('subject', 'Confirmation Mail');
    form.append('text', 'Confirmation Mail');
    return await this.httpService
      .post(
        'https://api.mailgun.net/v3/sandbox33ce8727b689499092c890efb9abea31.mailgun.org/messages',
        form,
        {
          headers: form.getHeaders(),
          auth: {
            username: 'api',
            password: process.env.MAILGUN_API_KEY,
          },
        },
      )
      .pipe(
        switchMap((res) => {
          return getConnection()
            .getRepository(users_user)
            .findOne({
              id: user_id,
            })
            .then((user) => {
              return {
                user,
                mailgun_response: res.data,
              };
            });
        }),
        map((res) => {
          getConnection().getRepository(mail).insert({
            email_gateway: 'mailgun',
            email_response: res.mailgun_response,
            user_: res.user,
            created_on: new Date(),
            updated_on: new Date(),
          });
          return res.mailgun_response ? { success: true } : { success: false };
        }),
      );
  }
}
