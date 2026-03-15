import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { CursosModule } from './cursos/cursos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { MateriasModule } from './materias/materias.module';
import { AvisosModule } from './avisos/avisos.module';
import { CiclosLectivosModule } from './ciclos-lectivos/ciclos-lectivos.module';
import { CicloCursosModule } from './ciclo-cursos/ciclo-cursos.module';
import { CicloMateriasModule } from './ciclo-materias/ciclo-materias.module';
import { NotasModule } from './notas/notas.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASS'),
        database: config.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
    RolesModule,
    CursosModule,
    UsuariosModule,
    MateriasModule,
    AvisosModule,
    CiclosLectivosModule,
    CicloCursosModule,
    CicloMateriasModule,
    NotasModule,
    AuthModule,
  ],
})
export class AppModule {}