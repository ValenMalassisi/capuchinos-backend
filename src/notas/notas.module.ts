import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotasController } from './notas.controller';
import { NotasService } from './notas.service';
import { Nota } from './nota.entity';
import { Usuario } from '../usuarios/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Nota, Usuario])],
  controllers: [NotasController],
  providers: [NotasService],
  exports: [TypeOrmModule],
})
export class NotasModule {}