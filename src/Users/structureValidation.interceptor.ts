import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ValidateInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()
    const { email, name, password, address, phone, country, city } = request.body

    if(email && name && password && address && phone && country && city){
      return next.handle()
    }else{
     throw new BadRequestException("La estructura del body es incorrecta")
    }
  }
}
