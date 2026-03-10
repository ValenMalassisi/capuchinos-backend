import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Materia } from './materia.entity';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { Usuario } from '../usuarios/usuario.entity';

@Injectable()
export class MateriasService {
  constructor(
    @InjectRepository(Materia)
    private readonly materiaRepo: Repository<Materia>,
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Materia[]> {
    return this.materiaRepo.find({ relations: ['curso', 'profesor'] });
  }

  async findOne(id: number): Promise<Materia | null> {
    return this.materiaRepo.findOne({ where: { id }, relations: ['curso', 'profesor'] });
  }

  async findByCurso(curso_id: number): Promise<Materia[]> {
    return this.materiaRepo.find({
      where: { curso: { id: curso_id } },
      relations: ['curso', 'profesor'],
    });
  }

  async create(dto: CreateMateriaDto): Promise<Materia> {
    if (dto.usuario_id) {
      const profesor = await this.usuarioRepo.findOne({
        where: { id: dto.usuario_id },
        relations: ['rol'],
      });
      if (!profesor || profesor.rol.tipo !== 'profesor') {
        throw new BadRequestException('El usuario no tiene rol de profesor');
      }
    }

    const materia = new Materia();
    materia.nombre = dto.nombre;
    materia.tipo = dto.tipo;
    materia.curso = { id: dto.curso_id } as any;
    materia.profesor = dto.usuario_id ? ({ id: dto.usuario_id } as any) : null;
    return this.materiaRepo.save(materia);
  }


  async update(id: number, dto: Partial<CreateMateriaDto>): Promise<Materia | null> {
    const materia = await this.findOne(id);
    if (!materia) return null;

    if (dto.nombre) materia.nombre = dto.nombre;
    if (dto.tipo) materia.tipo = dto.tipo;
    if (dto.curso_id) materia.curso = { id: dto.curso_id } as any;
    if (dto.usuario_id) materia.profesor = { id: dto.usuario_id } as any;

    return this.materiaRepo.save(materia);
  }

  async remove(id: number): Promise<void> {
    await this.materiaRepo.delete(id);
  }
}