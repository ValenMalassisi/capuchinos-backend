import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CicloLectivo } from '../ciclos-lectivos/ciclo-lectivo.entity';
import { Materia } from '../materias/materia.entity';
import { Usuario } from '../usuarios/usuario.entity';

@Entity('ciclo_materias')
export class CicloMateria {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CicloLectivo)
  @JoinColumn({ name: 'ciclo_lectivo_id' })
  cicloLectivo: CicloLectivo;

  @ManyToOne(() => Materia)
  @JoinColumn({ name: 'materia_id' })
  materia: Materia;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'usuario_id' })
  profesor: Usuario | null;
}