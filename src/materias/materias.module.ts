import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MateriasController } from './materias.controller';
import { MateriasService } from './materias.service';
import { Materia } from './materia.entity';
import { Usuario } from '../usuarios/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Materia, Usuario])],
  controllers: [MateriasController],
  providers: [MateriasService],
  exports: [TypeOrmModule],
})
export class MateriasModule {}