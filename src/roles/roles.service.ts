import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from './rol.entity';
import { CreateRolDto } from './dto/create-rol.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepo: Repository<Rol>,
  ) {}

  async findAll(): Promise<Rol[]> {
    return this.rolRepo.find();
  }

  async findOne(id: number): Promise<Rol | null> {
    return this.rolRepo.findOne({ where: { id } });
  }

  async create(dto: CreateRolDto): Promise<Rol> {
    const rol = this.rolRepo.create(dto);
    return this.rolRepo.save(rol);
  }

  async update(id: number, dto: Partial<CreateRolDto>): Promise<Rol | null> {
    await this.rolRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.rolRepo.delete(id);
  }
}