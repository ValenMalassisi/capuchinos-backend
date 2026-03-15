import { Test, TestingModule } from '@nestjs/testing';
import { CicloMateriasController } from './ciclo-materias.controller';

describe('CicloMateriasController', () => {
  let controller: CicloMateriasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CicloMateriasController],
    }).compile();

    controller = module.get<CicloMateriasController>(CicloMateriasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
