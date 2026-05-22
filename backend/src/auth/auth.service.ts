import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcryptjs';
import { AuthPayloadDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usuariosService: UsuariosService,
  ) {}

  // 1. Validar si el usuario existe y la contraseña coincide
  async validateUser(auth: AuthPayloadDTO): Promise<any> {
    const user = await this.usuariosService.findOneToLogin(auth.username);
    const isMatch =
      user && (await bcrypt.compare(auth.password, user.password));
    if (isMatch) {
      return { id: user.id, username: user.username };
    }
    throw new UnauthorizedException(
      'El usuario o la contraseña son incorrectos',
    );
  }

  // 2. Generar el JWT tras un login exitoso
  login(user: any) {
    const payload = { username: user.username, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
