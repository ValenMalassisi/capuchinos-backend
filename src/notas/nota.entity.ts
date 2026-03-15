import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { CicloMateria } from '../ciclo-materias/ciclo-materia.entity';

@Entity('notas')
export class Nota {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'alumno_id' })
  alumno: Usuario;

  @ManyToOne(() => CicloMateria)
  @JoinColumn({ name: 'ciclo_materia_id' })
  cicloMateria: CicloMateria;

  @Column({ type: 'numeric', precision: 4, scale: 2, nullable: true })
  calificacion_1: number | null;

  @Column({ type: 'varchar', nullable: true })
  valoracion_1: string | null;

  @Column({ type: 'numeric', precision: 4, scale: 2, nullable: true })
  calificacion_2: number | null;

  @Column({ type: 'varchar', nullable: true })
  valoracion_2: string | null;

  @Column({ type: 'numeric', precision: 4, scale: 2, nullable: true })
  intensificacion_c1: number | null;

  @Column({ type: 'numeric', precision: 4, scale: 2, nullable: true })
  intensificacion_dic: number | null;

  @Column({ type: 'numeric', precision: 4, scale: 2, nullable: true })
  intensificacion_feb: number | null;

  @Column({ type: 'numeric', precision: 4, scale: 2, nullable: true })
  calificacion_final: number | null;
}