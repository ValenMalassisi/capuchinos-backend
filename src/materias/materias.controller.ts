import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { MateriasService } from './materias.service';
import { CreateMateriaDto } from './dto/create-materia.dto';

@Controller('materias')
export class MateriasController {
  constructor(private readonly materiasService: MateriasService) {}

  @Get()
  findAll() {
    return this.materiasService.findAll();
  }

  @Get('curso/:curso_id')
  findByCurso(@Param('curso_id') curso_id: string) {
    return this.materiasService.findByCurso(+curso_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materiasService.findOne(+id);
  }

  @Post()
  create(@Body() dto: CreateMateriaDto) {
    return this.materiasService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreateMateriaDto) {
    return this.materiasService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materiasService.remove(+id);
  }
}