import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
export class CreatePermisoDto {
  @IsString({ message: 'El nombre del permiso debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre del permiso es obligatorio' })
  @MaxLength(20, {
    message: 'El nombre del permiso no puede exceder los 20 caracteres',
  })
  nombre!: string;

  @IsString({
    message: 'La descripción del permiso debe ser una cadena de texto',
  })
  @IsNotEmpty({ message: 'La descripción del permiso es obligatoria' })
  @MaxLength(200, {
    message: 'La descripción del permiso no puede exceder los 200 caracteres',
  })
  descripcion!: string;
}
