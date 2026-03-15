import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CiclosLectivosController } from './ciclos-lectivos.controller';
import { CiclosLectivosService } from './ciclos-lectivos.service';
import { CicloLectivo } from './ciclo-lectivo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CicloLectivo])],
  controllers: [CiclosLectivosController],
  providers: [CiclosLectivosService],
  exports: [TypeOrmModule],
})
export class CiclosLectivosModule {}