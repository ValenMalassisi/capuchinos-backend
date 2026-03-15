import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CicloCursosService } from './ciclo-cursos.service';
import { CreateCicloCursoDto } from './dto/create-ciclo-curso.dto';

@Controller('ciclo-cursos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CicloCursosController {
  constructor(private readonly cicloCursosService: CicloCursosService) {}

  @Get()
  @Roles('admin', 'preceptor')
  findAll() {
    return this.cicloCursosService.findAll();
  }

  @Get('ciclo/:ciclo_lectivo_id')
  @Roles('admin', 'preceptor', 'profesor', 'alumno')
  findByCiclo(@Param('ciclo_lectivo_id') ciclo_lectivo_id: string) {
    return this.cicloCursosService.findByCiclo(+ciclo_lectivo_id);
  }

  @Post()
  @Roles('admin')
  create(@Body() dto: CreateCicloCursoDto) {
    return this.cicloCursosService.create(dto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.cicloCursosService.remove(+id);
  }
}