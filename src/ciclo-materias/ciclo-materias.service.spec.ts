import { Test, TestingModule } from '@nestjs/testing';
import { CicloMateriasService } from './ciclo-materias.service';

describe('CicloMateriasService', () => {
  let service: CicloMateriasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CicloMateriasService],
    }).compile();

    service = module.get<CicloMateriasService>(CicloMateriasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
