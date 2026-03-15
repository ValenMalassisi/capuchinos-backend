import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Rol } from '../roles/rol.entity';
import { Curso } from '../cursos/curso.entity';
import { Exclude } from 'class-transformer';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  dni: string;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  telefono: string | null;

  @Exclude()
  @Column()
  password_hash: string;

  @Column({ default: true })
  activo: boolean;

  @Column({ type: 'varchar', nullable: true })
  matricula: string | null;

  @ManyToOne(() => Rol)
  @JoinColumn({ name: 'rol_id' })
  rol: Rol;

  @ManyToOne(() => Curso, { nullable: true })
  @JoinColumn({ name: 'curso_id' })
  curso: Curso | null;
}