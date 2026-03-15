import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aviso } from './aviso.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { CreateAvisoDto } from './dto/create-aviso.dto';

@Injectable()
export class AvisosService {
  constructor(
    @InjectRepository(Aviso)
    private readonly avisoRepo: Repository<Aviso>,
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  // Trae todos los avisos de una materia
  async findByMateria(materia_id: number): Promise<Aviso[]> {
    return this.avisoRepo.find({
      where: { materia: { id: materia_id } },
      relations: ['usuario', 'materia'],
      order: { fecha: 'DESC' },
    });
  }

  // Trae todos los avisos de un curso
  async findByCurso(curso_id: number): Promise<Aviso[]> {
    return this.avisoRepo.find({
      where: { curso: { id: curso_id } },
      relations: ['usuario', 'curso'],
      order: { fecha: 'DESC' },
    });
  }

  async create(dto: CreateAvisoDto): Promise<Aviso> {
    // Validar que venga uno y solo uno de los dos destinos
    if (!dto.curso_id && !dto.materia_id) {
      throw new BadRequestException('Debe especificar curso_id o materia_id');
    }
    if (dto.curso_id && dto.materia_id) {
      throw new BadRequestException('No puede especificar curso_id y materia_id al mismo tiempo');
    }

    // Validar rol del usuario
    const usuario = await this.usuarioRepo.findOne({
      where: { id: dto.usuario_id },
      relations: ['rol'],
    });

    if (!usuario) {
      throw new BadRequestException('Usuario no encontrado');
    }

    if (dto.materia_id && usuario.rol.tipo !== 'profesor') {
      throw new BadRequestException('Solo un profesor puede publicar en una materia');
    }

    if (dto.curso_id && !['preceptor', 'admin'].includes(usuario.rol.tipo)) {
      throw new BadRequestException('Solo un preceptor o admin puede publicar en un curso');
    }

    const aviso = new Aviso();
    aviso.titulo = dto.titulo;
    aviso.contenido = dto.contenido;
    aviso.usuario = { id: dto.usuario_id } as any;
    aviso.curso = dto.curso_id ? ({ id: dto.curso_id } as any) : null;
    aviso.materia = dto.materia_id ? ({ id: dto.materia_id } as any) : null;

    return this.avisoRepo.save(aviso);
  }

  async remove(id: number): Promise<void> {
    await this.avisoRepo.delete(id);
  }
}