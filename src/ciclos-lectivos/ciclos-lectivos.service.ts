import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CicloLectivo } from './ciclo-lectivo.entity';
import { CreateCicloLectivoDto } from './dto/create-ciclo-lectivo.dto';

@Injectable()
export class CiclosLectivosService {
  constructor(
    @InjectRepository(CicloLectivo)
    private readonly cicloRepo: Repository<CicloLectivo>,
  ) {}

  async findAll(): Promise<CicloLectivo[]> {
    return this.cicloRepo.find({ order: { anio: 'DESC' } });
  }

  async findActivo(): Promise<CicloLectivo | null> {
    return this.cicloRepo.findOne({ where: { activo: true } });
  }

  async create(dto: CreateCicloLectivoDto): Promise<CicloLectivo> {
    const ciclo = new CicloLectivo();
    ciclo.anio = dto.anio;
    ciclo.activo = dto.activo ?? false;
    return this.cicloRepo.save(ciclo);
  }

  // Al activar un ciclo, desactiva todos los demás
  async activar(id: number): Promise<CicloLectivo | null> {
    await this.cicloRepo.update({}, { activo: false });
    await this.cicloRepo.update(id, { activo: true });
    return this.cicloRepo.findOne({ where: { id } });
  }
}