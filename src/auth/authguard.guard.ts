import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly JwtService: JwtService) {}
 canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = request.headers['authorization']?.split(' ')[1] ?? ''

    if(!token) throw new UnauthorizedException('No token provided')

    try {
      const secret = process.env.JWT_SECRET
      const payload = this.JwtService.verify(token, { secret })
      
      
      request.iat = new Date(payload.iat * 1000)
      request.exp = new Date(payload.exp * 1000)
      request.user = payload
      return true;

    } catch (error) {
      throw new UnauthorizedException('Invalid token')
    }
  }
}
