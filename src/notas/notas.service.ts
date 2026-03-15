import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nota } from './nota.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { CreateNotaDto } from './dto/create-nota.dto';
import { UpdateNotaDto } from './dto/update-nota.dto';

@Injectable()
export class NotasService {
  constructor(
    @InjectRepository(Nota)
    private readonly notaRepo: Repository<Nota>,
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  // Notas de un alumno en un ciclo lectivo
  async findByAlumno(alumno_id: number): Promise<Nota[]> {
    return this.notaRepo.find({
      where: { alumno: { id: alumno_id } },
      relations: ['cicloMateria', 'cicloMateria.materia', 'cicloMateria.cicloLectivo'],
    });
  }

  // Notas de todos los alumnos en una ciclo materia (para el profesor)
  async findByCicloMateria(ciclo_materia_id: number): Promise<Nota[]> {
    return this.notaRepo.find({
      where: { cicloMateria: { id: ciclo_materia_id } },
      relations: ['alumno', 'cicloMateria', 'cicloMateria.materia'],
    });
  }

  // Materias pendientes de un alumno (calificacion_final < 7)
  async findPendientes(alumno_id: number): Promise<Nota[]> {
    return this.notaRepo
      .createQueryBuilder('nota')
      .leftJoinAndSelect('nota.cicloMateria', 'cicloMateria')
      .leftJoinAndSelect('cicloMateria.materia', 'materia')
      .leftJoinAndSelect('cicloMateria.cicloLectivo', 'cicloLectivo')
      .where('nota.alumno_id = :alumno_id', { alumno_id })
      .andWhere('nota.calificacion_final < 7')
      .getMany();
  }

  async create(dto: CreateNotaDto): Promise<Nota> {
    const alumno = await this.usuarioRepo.findOne({
      where: { id: dto.alumno_id },
      relations: ['rol'],
    });
    if (!alumno || alumno.rol.tipo !== 'alumno') {
      throw new BadRequestException('El usuario no tiene rol de alumno');
    }

    const nota = new Nota();
    nota.alumno = { id: dto.alumno_id } as any;
    nota.cicloMateria = { id: dto.ciclo_materia_id } as any;
    return this.notaRepo.save(nota);
  }

  async update(id: number, dto: UpdateNotaDto): Promise<Nota | null> {
    const nota = await this.notaRepo.findOne({ where: { id } });
    if (!nota) return null;

    if (dto.calificacion_1 !== undefined) nota.calificacion_1 = dto.calificacion_1;
    if (dto.valoracion_1 !== undefined) nota.valoracion_1 = dto.valoracion_1;
    if (dto.calificacion_2 !== undefined) nota.calificacion_2 = dto.calificacion_2;
    if (dto.valoracion_2 !== undefined) nota.valoracion_2 = dto.valoracion_2;
    if (dto.intensificacion_c1 !== undefined) nota.intensificacion_c1 = dto.intensificacion_c1;
    if (dto.intensificacion_dic !== undefined) nota.intensificacion_dic = dto.intensificacion_dic;
    if (dto.intensificacion_feb !== undefined) nota.intensificacion_feb = dto.intensificacion_feb;
    if (dto.calificacion_final !== undefined) nota.calificacion_final = dto.calificacion_final;

    return this.notaRepo.save(nota);
  }
}