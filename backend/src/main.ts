import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remueve propiedades del JSON que no estén en el DTO
      forbidNonWhitelisted: true, // Lanza un error si envían propiedades no permitidas
      transform: true, // Transforma los tipos automáticamente (ej. string a number)
    }),
  );
  app.setGlobalPrefix('api/v1'); // Prefijo global para todas las rutas (ej. /api/auth/login)
  app.enableCors({
    origin: [process.env.frontend_url, process.env.backend_url], // Permite solicitudes solo desde el frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(process.env.API_PORT ?? 3000);
}
bootstrap();
