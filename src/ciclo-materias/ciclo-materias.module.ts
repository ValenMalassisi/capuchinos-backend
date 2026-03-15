import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CicloMateriasController } from './ciclo-materias.controller';
import { CicloMateriasService } from './ciclo-materias.service';
import { CicloMateria } from './ciclo-materia.entity';
import { Usuario } from '../usuarios/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CicloMateria, Usuario])],
  controllers: [CicloMateriasController],
  providers: [CicloMateriasService],
  exports: [TypeOrmModule],
})
export class CicloMateriasModule {}