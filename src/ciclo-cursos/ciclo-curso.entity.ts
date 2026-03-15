import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CicloLectivo } from '../ciclos-lectivos/ciclo-lectivo.entity';
import { Curso } from '../cursos/curso.entity';

@Entity('ciclo_cursos')
export class CicloCurso {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CicloLectivo)
  @JoinColumn({ name: 'ciclo_lectivo_id' })
  cicloLectivo: CicloLectivo;

  @ManyToOne(() => Curso)
  @JoinColumn({ name: 'curso_id' })
  curso: Curso;
}