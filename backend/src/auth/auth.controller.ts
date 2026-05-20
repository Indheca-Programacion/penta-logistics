import { Controller, Post, UseGuards, Req, Get, Body } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guards';
import { AuthPayloadDTO } from './dto/auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // POST /auth/login -> Usa la estrategia Local
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Body() AuthPayloadDTO: AuthPayloadDTO) {
    return this.authService.login(AuthPayloadDTO);
  }

  // GET /auth/perfil -> Usa la estrategia JWT (Ruta Protegida)
  @UseGuards(JwtAuthGuard)
  @Get('perfil')
  getProfile(@Req() req: Request & { user: AuthPayloadDTO }) {
    // Devuelve los datos del token decodificado
    return req.user;
  }
}
