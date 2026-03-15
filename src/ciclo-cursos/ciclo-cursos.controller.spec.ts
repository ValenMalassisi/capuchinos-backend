import { Test, TestingModule } from '@nestjs/testing';
import { CicloCursosController } from './ciclo-cursos.controller';

describe('CicloCursosController', () => {
  let controller: CicloCursosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CicloCursosController],
    }).compile();

    controller = module.get<CicloCursosController>(CicloCursosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
