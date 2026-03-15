import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { AvisosService } from './avisos.service';
import { CreateAvisoDto } from './dto/create-aviso.dto';

@Controller('avisos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AvisosController {
  constructor(private readonly avisosService: AvisosService) {}

  @Get('materia/:materia_id')
  @Roles('admin', 'preceptor', 'profesor', 'alumno')
  findByMateria(@Param('materia_id') materia_id: string) {
    return this.avisosService.findByMateria(+materia_id);
  }

  @Get('curso/:curso_id')
  @Roles('admin', 'preceptor', 'profesor', 'alumno')
  findByCurso(@Param('curso_id') curso_id: string) {
    return this.avisosService.findByCurso(+curso_id);
  }

  @Post()
  @Roles('admin', 'preceptor', 'profesor')
  create(@Body() dto: CreateAvisoDto) {
    return this.avisosService.create(dto);
  }

  @Delete(':id')
  @Roles('admin', 'preceptor', 'profesor')
  remove(@Param('id') id: string) {
    return this.avisosService.remove(+id);
  }
}