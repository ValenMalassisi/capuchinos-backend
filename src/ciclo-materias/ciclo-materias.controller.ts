import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CicloMateriasService } from './ciclo-materias.service';
import { CreateCicloMateriaDto } from './dto/create-ciclo-materia.dto';

@Controller('ciclo-materias')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CicloMateriasController {
  constructor(private readonly cicloMateriasService: CicloMateriasService) {}

  @Get('ciclo/:ciclo_lectivo_id')
  @Roles('admin', 'preceptor', 'profesor', 'alumno')
  findByCiclo(@Param('ciclo_lectivo_id') ciclo_lectivo_id: string) {
    return this.cicloMateriasService.findByCiclo(+ciclo_lectivo_id);
  }

  @Get('ciclo/:ciclo_lectivo_id/curso/:curso_id')
  @Roles('admin', 'preceptor', 'profesor', 'alumno')
  findByCicloYCurso(
    @Param('ciclo_lectivo_id') ciclo_lectivo_id: string,
    @Param('curso_id') curso_id: string,
  ) {
    return this.cicloMateriasService.findByCicloYCurso(+ciclo_lectivo_id, +curso_id);
  }

  @Post()
  @Roles('admin')
  create(@Body() dto: CreateCicloMateriaDto) {
    return this.cicloMateriasService.create(dto);
  }

  @Put(':id/profesor')
  @Roles('admin')
  asignarProfesor(
    @Param('id') id: string,
    @Body() body: { usuario_id: number },
  ) {
    return this.cicloMateriasService.asignarProfesor(+id, body.usuario_id);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.cicloMateriasService.remove(+id);
  }
}