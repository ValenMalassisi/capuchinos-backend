import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('ciclos_lectivos')
export class CicloLectivo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  anio: number;

  @Column({ default: false })
  activo: boolean;
}