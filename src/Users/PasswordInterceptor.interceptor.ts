import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    return next.handle().pipe(
      map(data => {
        if (Array.isArray(data)) {
          return data.map(user => {
            const { password, ...result } = user;
            return result; 
          });
        }

        const { password, ...result } = data;
        return result;
      }),
    )
  }
}
