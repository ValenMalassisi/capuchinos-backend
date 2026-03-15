import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { MateriasService } from './materias.service';
import { CreateMateriaDto } from './dto/create-materia.dto';

@Controller('materias')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MateriasController {
  constructor(private readonly materiasService: MateriasService) {}

  @Get()
  @Roles('admin', 'preceptor', 'profesor', 'alumno')
  findAll() {
    return this.materiasService.findAll();
  }

  @Get('curso/:curso_id')
  @Roles('admin', 'preceptor', 'profesor', 'alumno')
  findByCurso(@Param('curso_id') curso_id: string) {
    return this.materiasService.findByCurso(+curso_id);
  }

  @Get(':id')
  @Roles('admin', 'preceptor', 'profesor', 'alumno')
  findOne(@Param('id') id: string) {
    return this.materiasService.findOne(+id);
  }

  @Post()
  @Roles('admin')
  create(@Body() dto: CreateMateriaDto) {
    return this.materiasService.create(dto);
  }

  @Put(':id')
  @Roles('admin', 'profesor')
  update(@Param('id') id: string, @Body() dto: CreateMateriaDto) {
    return this.materiasService.update(+id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.materiasService.remove(+id);
  }
}