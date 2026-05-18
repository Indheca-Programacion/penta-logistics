import { IsString, IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MaxLength(100, { message: 'El nombre no puede tener más de 100 caracteres' })
  nombre!: string;

  @IsNotEmpty({ message: 'El apellido paterno es obligatorio' })
  @MaxLength(100, {
    message: 'El apellido paterno no puede tener más de 100 caracteres',
  })
  apellidoPaterno!: string;

  @IsNotEmpty({ message: 'El apellido materno es obligatorio' })
  @MaxLength(100, {
    message: 'El apellido materno no puede tener más de 100 caracteres',
  })
  apellidoMaterno!: string;

  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  email!: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MaxLength(255, {
    message: 'La contraseña no puede tener más de 255 caracteres',
  })
  password!: string;
}
