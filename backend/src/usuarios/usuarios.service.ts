import { Injectable } from '@nestjs/common';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: Partial<Usuario>):Promise<Usuario> {
    const existingUser = await this.usuariosRepository.findOne({ where: { email: createUsuarioDto.email } });
    if (existingUser) {
      throw new Error('Email already in use');
    }
    const nuevoUsuario = this.usuariosRepository.create(createUsuarioDto);
    return this.usuariosRepository.save(nuevoUsuario);
  }

  findAll() {
    return this.usuariosRepository.find();
  }

  findOne(id: string) {
    return this.usuariosRepository.findOne({ where: { id } });
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.usuariosRepository.findOne({ where: { id } });
    if (!usuario) {
      throw new Error('User not found');
    }
    Object.assign(usuario, updateUsuarioDto);
    return this.usuariosRepository.save(usuario);
  }

  async remove(id: string): Promise<void> {
    const usuario = await this.usuariosRepository.findOne({ where: { id } });
    if (!usuario) {
      throw new Error('User not found');
    }
    await this.usuariosRepository.remove(usuario);
  }
}
