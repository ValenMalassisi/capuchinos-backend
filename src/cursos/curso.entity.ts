import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cursos')
export class Curso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nivel: string;

  @Column()
  anio: number;

  @Column()
  seccion: string;
}