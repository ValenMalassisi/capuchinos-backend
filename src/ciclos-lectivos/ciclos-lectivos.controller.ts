import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CiclosLectivosService } from './ciclos-lectivos.service';
import { CreateCicloLectivoDto } from './dto/create-ciclo-lectivo.dto';

@Controller('ciclos-lectivos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CiclosLectivosController {
  constructor(private readonly ciclosLectivosService: CiclosLectivosService) {}

  @Get()
  @Roles('admin', 'preceptor', 'profesor', 'alumno')
  findAll() {
    return this.ciclosLectivosService.findAll();
  }

  @Get('activo')
  @Roles('admin', 'preceptor', 'profesor', 'alumno')
  findActivo() {
    return this.ciclosLectivosService.findActivo();
  }

  @Post()
  @Roles('admin')
  create(@Body() dto: CreateCicloLectivoDto) {
    return this.ciclosLectivosService.create(dto);
  }

  @Post(':id/activar')
  @Roles('admin')
  activar(@Param('id') id: string) {
    return this.ciclosLectivosService.activar(+id);
  }
}