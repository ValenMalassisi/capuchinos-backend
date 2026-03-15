import { Test, TestingModule } from '@nestjs/testing';
import { CiclosLectivosService } from './ciclos-lectivos.service';

describe('CiclosLectivosService', () => {
  let service: CiclosLectivosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CiclosLectivosService],
    }).compile();

    service = module.get<CiclosLectivosService>(CiclosLectivosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
