export class CreateAvisoDto {
  titulo: string;
  contenido: string;
  usuario_id: number;
  curso_id?: number;
  materia_id?: number;
}