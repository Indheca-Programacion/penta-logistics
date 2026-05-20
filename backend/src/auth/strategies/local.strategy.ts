import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super(); // Por defecto busca campos llamados 'username' y 'password'
  }

  validate(username: string, password: string) {
    const user = this.authService.validateUser({ username, password });
    if (!user) throw new UnauthorizedException('Credenciales inválidas');
    return user;
  }
}
