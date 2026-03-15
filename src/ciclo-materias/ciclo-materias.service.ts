import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CicloMateria } from './ciclo-materia.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { CreateCicloMateriaDto } from './dto/create-ciclo-materia.dto';

@Injectable()
export class CicloMateriasService {
  constructor(
    @InjectRepository(CicloMateria)
    private readonly cicloMateriaRepo: Repository<CicloMateria>,
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  async findByCiclo(ciclo_lectivo_id: number): Promise<CicloMateria[]> {
    return this.cicloMateriaRepo.find({
      where: { cicloLectivo: { id: ciclo_lectivo_id } },
      relations: ['cicloLectivo', 'materia', 'profesor'],
    });
  }

  async findByCicloYCurso(ciclo_lectivo_id: number, curso_id: number): Promise<CicloMateria[]> {
    return this.cicloMateriaRepo.find({
      where: {
        cicloLectivo: { id: ciclo_lectivo_id },
        materia: { curso: { id: curso_id } },
      },
      relations: ['cicloLectivo', 'materia', 'materia.curso', 'profesor'],
    });
  }

  async create(dto: CreateCicloMateriaDto): Promise<CicloMateria> {
    if (dto.usuario_id) {
      const profesor = await this.usuarioRepo.findOne({
        where: { id: dto.usuario_id },
        relations: ['rol'],
      });
      if (!profesor || profesor.rol.tipo !== 'profesor') {
        throw new BadRequestException('El usuario no tiene rol de profesor');
      }
    }

    const cicloMateria = new CicloMateria();
    cicloMateria.cicloLectivo = { id: dto.ciclo_lectivo_id } as any;
    cicloMateria.materia = { id: dto.materia_id } as any;
    cicloMateria.profesor = dto.usuario_id ? ({ id: dto.usuario_id } as any) : null;
    return this.cicloMateriaRepo.save(cicloMateria);
  }

  async asignarProfesor(id: number, usuario_id: number): Promise<CicloMateria | null> {
    const profesor = await this.usuarioRepo.findOne({
      where: { id: usuario_id },
      relations: ['rol'],
    });
    if (!profesor || profesor.rol.tipo !== 'profesor') {
      throw new BadRequestException('El usuario no tiene rol de profesor');
    }
    await this.cicloMateriaRepo.update(id, { profesor: { id: usuario_id } as any });
    return this.cicloMateriaRepo.findOne({
      where: { id },
      relations: ['cicloLectivo', 'materia', 'profesor'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.cicloMateriaRepo.delete(id);
  }
}