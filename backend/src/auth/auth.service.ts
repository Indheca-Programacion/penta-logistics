import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usuariosService: UsuariosService,
  ) {}

  // 1. Validar si el usuario existe y la contraseña coincide
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usuariosService.findOneToLogin(username);
    const isMatch = user && (await bcrypt.compare(pass, user.password));
    if (isMatch) {
      return { id: user.id, username: user.username };
    }
    return null;
  }

  // 2. Generar el JWT tras un login exitoso
  login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
