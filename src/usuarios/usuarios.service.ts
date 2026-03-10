import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepo.find({ relations: ['rol', 'curso'] });
  }

  async findOne(id: number): Promise<Usuario | null> {
    return this.usuarioRepo.findOne({ where: { id }, relations: ['rol', 'curso'] });
  }

  async create(dto: CreateUsuarioDto): Promise<Usuario> {
    const hash = await bcrypt.hash(dto.password, 10);
    const usuario = new Usuario();
    usuario.dni = dto.dni;
    usuario.nombre = dto.nombre;
    usuario.apellido = dto.apellido;
    usuario.email = dto.email;
    usuario.telefono = dto.telefono ?? null;
    usuario.password_hash = hash;
    usuario.matricula = dto.matricula ?? null;
    usuario.rol = { id: dto.rol_id } as any;
    usuario.curso = dto.curso_id ? ({ id: dto.curso_id } as any) : null;
    return this.usuarioRepo.save(usuario);
  }

  async update(id: number, dto: Partial<CreateUsuarioDto>): Promise<Usuario | null> {
    const usuario = await this.findOne(id);
    if (!usuario) return null;

    if (dto.nombre) usuario.nombre = dto.nombre;
    if (dto.apellido) usuario.apellido = dto.apellido;
    if (dto.email) usuario.email = dto.email;
    if (dto.telefono !== undefined) usuario.telefono = dto.telefono ?? null;
    if (dto.matricula !== undefined) usuario.matricula = dto.matricula ?? null;
    if (dto.rol_id) usuario.rol = { id: dto.rol_id } as any;
    if (dto.curso_id) usuario.curso = { id: dto.curso_id } as any;

    return this.usuarioRepo.save(usuario);
  }

  async remove(id: number): Promise<void> {
    await this.usuarioRepo.update(id, { activo: false });
  }
}