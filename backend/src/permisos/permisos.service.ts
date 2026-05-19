import { Injectable, ConflictException } from '@nestjs/common';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permiso } from './entities/permiso.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermisosService {
  constructor(
    @InjectRepository(Permiso)
    private readonly permisosRepository: Repository<Permiso>,
  ) {}
  async create(createPermisoDto: CreatePermisoDto): Promise<Permiso> {
    const existingPermiso = await this.permisosRepository.findOne({
      where: { nombre: createPermisoDto.nombre },
    });
    if (existingPermiso) {
      throw new ConflictException('Permiso ya existe');
    }
    const permiso = this.permisosRepository.create(createPermisoDto);
    return this.permisosRepository.save(permiso);
  }

  async findAll() {
    return this.permisosRepository.find();
  }

  async findOne(id: number) {
    const permiso = await this.permisosRepository.findOne({ where: { id } });
    if (!permiso) {
      throw new ConflictException('Permiso no encontrado');
    }
    return permiso;
  }

  async update(id: number, updatePermisoDto: UpdatePermisoDto) {
    const permiso = await this.findOne(id);
    if (!permiso) {
      throw new ConflictException('Permiso no encontrado');
    }
    await this.permisosRepository.update(id, updatePermisoDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const permiso = await this.findOne(id);
    if (!permiso) {
      throw new ConflictException('Permiso no encontrado');
    }
    await this.permisosRepository.delete(id);
    return { message: 'Permiso eliminado correctamente' };
  }
}
