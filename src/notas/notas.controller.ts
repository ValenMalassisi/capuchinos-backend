import { Controller, Get, Post, Put, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { NotasService } from './notas.service';
import { CreateNotaDto } from './dto/create-nota.dto';
import { UpdateNotaDto } from './dto/update-nota.dto';

@Controller('notas')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NotasController {
  constructor(private readonly notasService: NotasService) {}

  @Get('alumno/:alumno_id')
  @Roles('alumno', 'profesor', 'preceptor', 'admin')
  findByAlumno(@Param('alumno_id') alumno_id: string) {
    return this.notasService.findByAlumno(+alumno_id);
  }

  @Get('ciclo-materia/:ciclo_materia_id')
  @Roles('profesor', 'admin')
  findByCicloMateria(@Param('ciclo_materia_id') ciclo_materia_id: string) {
    return this.notasService.findByCicloMateria(+ciclo_materia_id);
  }

  @Get('alumno/:alumno_id/pendientes')
  @Roles('alumno', 'profesor', 'preceptor', 'admin')
  findPendientes(@Param('alumno_id') alumno_id: string) {
    return this.notasService.findPendientes(+alumno_id);
  }

  @Post()
  @Roles('profesor', 'admin')
  create(@Body() dto: CreateNotaDto) {
    return this.notasService.create(dto);
  }

  @Put(':id')
  @Roles('profesor', 'admin')
  update(@Param('id') id: string, @Body() dto: UpdateNotaDto) {
    return this.notasService.update(+id, dto);
  }
}