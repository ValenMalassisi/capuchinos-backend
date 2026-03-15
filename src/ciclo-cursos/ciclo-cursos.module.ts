import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CicloCursosController } from './ciclo-cursos.controller';
import { CicloCursosService } from './ciclo-cursos.service';
import { CicloCurso } from './ciclo-curso.entity';
import { Usuario } from '../usuarios/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CicloCurso, Usuario])],
  controllers: [CicloCursosController],
  providers: [CicloCursosService],
  exports: [TypeOrmModule],
})
export class CicloCursosModule {}