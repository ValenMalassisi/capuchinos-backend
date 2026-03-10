import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Curso } from './curso.entity';
import { CreateCursoDto } from './dto/create-curso.dto';

@Injectable()
export class CursosService {
  constructor(
    @InjectRepository(Curso)
    private readonly cursoRepo: Repository<Curso>,
  ) {}

  async findAll(): Promise<Curso[]> {
    return this.cursoRepo.find();
  }

  async findOne(id: number): Promise<Curso | null> {
    return this.cursoRepo.findOne({ where: { id } });
  }

  async create(dto: CreateCursoDto): Promise<Curso> {
    const curso = this.cursoRepo.create(dto);
    return this.cursoRepo.save(curso);
  }

  async update(id: number, dto: Partial<CreateCursoDto>): Promise<Curso | null> {
    await this.cursoRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.cursoRepo.delete(id);
  }
}