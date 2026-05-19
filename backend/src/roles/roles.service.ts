import { Injectable, ConflictException } from '@nestjs/common';
import CreateRoleDto from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  async create(roleData: CreateRoleDto): Promise<Role> {
    const existingRole = await this.rolesRepository.findOne({
      where: { nombre: roleData.nombre },
    });
    if (existingRole) {
      throw new ConflictException('El nombre del rol ya existe');
    }
    const nuevoRol = this.rolesRepository.create(roleData);
    return this.rolesRepository.save(nuevoRol);
  }

  findAll() {
    return this.rolesRepository.find();
  }

  async findOne(id: number) {
    const role = await this.rolesRepository.findOne({ where: { id } });
    if (!role) {
      throw new ConflictException('No se encontró el rol');
    }
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.rolesRepository.findOne({ where: { id } });
    if (!role) {
      throw new ConflictException('No se encontró el rol');
    }
    await this.rolesRepository.update(id, updateRoleDto);
    const updatedRole = await this.findOne(id);
    if (!updatedRole) {
      throw new ConflictException('No se encontró el rol');
    }
    return updatedRole;
  }

  async remove(id: number) {
    const role = await this.rolesRepository.findOne({ where: { id } });
    if (!role) {
      throw new ConflictException('No se encontró el rol');
    }
    await this.rolesRepository.delete(id);
    return { message: 'Rol eliminado correctamente' };
  }
}
