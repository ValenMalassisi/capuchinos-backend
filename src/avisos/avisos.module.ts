import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvisosController } from './avisos.controller';
import { AvisosService } from './avisos.service';
import { Aviso } from './aviso.entity';
import { Usuario } from '../usuarios/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Aviso, Usuario])],
  controllers: [AvisosController],
  providers: [AvisosService],
  exports: [TypeOrmModule],
})
export class AvisosModule {}