import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
export default class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20, { message: 'El nombre no puede tener más de 20 caracteres' })
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255, {
    message: 'La descripción no puede tener más de 255 caracteres',
  })
  descripcion!: string;
}
