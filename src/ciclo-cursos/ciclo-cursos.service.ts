import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CicloCurso } from './ciclo-curso.entity';
import { CreateCicloCursoDto } from './dto/create-ciclo-curso.dto';

@Injectable()
export class CicloCursosService {
  constructor(
    @InjectRepository(CicloCurso)
    private readonly cicloCursoRepo: Repository<CicloCurso>,
  ) {}

  async findAll(): Promise<CicloCurso[]> {
    return this.cicloCursoRepo.find({ relations: ['cicloLectivo', 'curso'] });
  }

  async findByCiclo(ciclo_lectivo_id: number): Promise<CicloCurso[]> {
    return this.cicloCursoRepo.find({
      where: { cicloLectivo: { id: ciclo_lectivo_id } },
      relations: ['cicloLectivo', 'curso'],
    });
  }

  async create(dto: CreateCicloCursoDto): Promise<CicloCurso> {
    const cicloCurso = new CicloCurso();
    cicloCurso.cicloLectivo = { id: dto.ciclo_lectivo_id } as any;
    cicloCurso.curso = { id: dto.curso_id } as any;
    return this.cicloCursoRepo.save(cicloCurso);
  }

  async remove(id: number): Promise<void> {
    await this.cicloCursoRepo.delete(id);
  }
}