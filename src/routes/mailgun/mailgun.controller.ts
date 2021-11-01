import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { MailgunService } from './mailgun.service';

@Controller('mailgun')
@UseGuards(AuthGuard)
export class MailgunController {
  constructor(private mailgunService: MailgunService) {}

  @Get('send-mail')
  async sendMail(@Req() req) {
    return await this.mailgunService.sendMail(
      req.decoded.email,
      req.decoded.user_id,
    );
  }
}
