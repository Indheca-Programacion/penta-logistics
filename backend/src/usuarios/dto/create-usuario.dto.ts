import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUsuarioDto {
    id: number;

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}
