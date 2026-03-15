import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CursosService } from './cursos.service';
import { CreateCursoDto } from './dto/create-curso.dto';

@Controller('cursos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CursosController {
  constructor(private readonly cursosService: CursosService) {}

  @Get()
  @Roles('admin', 'preceptor', 'profesor', 'alumno')
  findAll() {
    return this.cursosService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'preceptor', 'profesor', 'alumno')
  findOne(@Param('id') id: string) {
    return this.cursosService.findOne(+id);
  }

  @Post()
  @Roles('admin')
  create(@Body() dto: CreateCursoDto) {
    return this.cursosService.create(dto);
  }

  @Put(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() dto: CreateCursoDto) {
    return this.cursosService.update(+id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.cursosService.remove(+id);
  }
}