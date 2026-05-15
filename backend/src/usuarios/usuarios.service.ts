import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  private usuarios: CreateUsuarioDto[] = [];

  create(createUsuarioDto: CreateUsuarioDto) {
    const newUsuario = { ...createUsuarioDto, id: this.usuarios.length + 1 };
    this.usuarios.push(newUsuario);
    return newUsuario;
  }

  findAll() {
    return this.usuarios;
  }

  findOne(id: number) {
    return this.usuarios.find((usuario) => usuario.id === id);
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const index = this.usuarios.findIndex((usuario) => usuario.id === id);
    if (index !== -1) {
      this.usuarios[index] = { ...this.usuarios[index], ...updateUsuarioDto };
    }
    return this.usuarios[index];
  }

  remove(id: number) {
    const index = this.usuarios.findIndex((usuario) => usuario.id === id);
    if (index !== -1) {
      this.usuarios.splice(index, 1);
    }
    return `This action removes a #${id} usuario`;
  }
}
