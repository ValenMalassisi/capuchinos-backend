import { Test, TestingModule } from '@nestjs/testing';
import { CicloCursosService } from './ciclo-cursos.service';

describe('CicloCursosService', () => {
  let service: CicloCursosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CicloCursosService],
    }).compile();

    service = module.get<CicloCursosService>(CicloCursosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
