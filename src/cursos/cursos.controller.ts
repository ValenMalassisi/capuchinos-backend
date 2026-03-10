import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CreateCursoDto } from './dto/create-curso.dto';

@Controller('cursos')
export class CursosController {
  constructor(private readonly cursosService: CursosService) {}

  @Get()
  findAll() {
    return this.cursosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cursosService.findOne(+id);
  }

  @Post()
  create(@Body() dto: CreateCursoDto) {
    return this.cursosService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreateCursoDto) {
    return this.cursosService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cursosService.remove(+id);
  }
}