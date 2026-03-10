export class CreateUsuarioDto {
  dni: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  password: string;
  matricula?: string;
  rol_id: number;
  curso_id?: number;
}