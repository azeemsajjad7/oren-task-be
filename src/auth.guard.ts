import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return new Promise((resolve) => {
      const req = context.switchToHttp().getRequest();
      const origin = req.get('host');
      let token = req.headers.token || req.query.token;
      if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
          if (err) {
            resolve(false);
          } else {
            req.decoded = decoded;
            resolve(true);
          }
        });
      } else {
        resolve(false);
      }
    });
  }
}
