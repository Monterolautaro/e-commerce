import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class StructureValidationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()
    const { name, description, price, stock, imgUrl } = request.body

    if( name && description && price && stock && imgUrl ){
      return next.handle()
    }else{
     throw new BadRequestException("La estructura del body es incorrecta")
    }
  }
}
