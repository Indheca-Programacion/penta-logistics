import { Injectable, ConflictException } from '@nestjs/common';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const existingUser = await this.usuariosRepository.findOne({
      where: { email: createUsuarioDto.email },
    });
    if (existingUser) {
      throw new ConflictException('El correo electronico ya está registrado');
    }
    const hashedPassword = await bcrypt.hash(createUsuarioDto.password, 10);
    const nuevoUsuario = this.usuariosRepository.create({
      ...createUsuarioDto,
      password: hashedPassword,
    });
    return this.usuariosRepository.save(nuevoUsuario);
  }

  findAll() {
    return this.usuariosRepository.find();
  }

  findOne(id: number) {
    return this.usuariosRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Usuario> {
    const usuario = await this.usuariosRepository.findOne({ where: { id } });
    if (!usuario) {
      throw new ConflictException('No se encontró el usuario');
    }
    await this.usuariosRepository.update(id, updateUsuarioDto);
    return {
      ...usuario,
      isActive: updateUsuarioDto.isActive ?? usuario.isActive,
    };
  }

  async remove(id: number): Promise<void> {
    const usuario = await this.usuariosRepository.findOne({ where: { id } });
    if (!usuario) {
      throw new ConflictException('No se encontró el usuario');
    }
    await this.usuariosRepository.remove(usuario);
  }
}
