import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // POST /auth/login -> Usa la estrategia Local
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    // Si llega aquí, significa que LocalStrategy.validate() fue exitoso
    // y guardó al usuario en req.user
    return this.authService.login(req.user);
  }

  // GET /auth/perfil -> Usa la estrategia JWT (Ruta Protegida)
  @UseGuards(AuthGuard('jwt'))
  @Get('perfil')
  getProfile(@Request() req) {
    // Devuelve los datos del token decodificado
    return req.user;
  }
}