import { Test, TestingModule } from '@nestjs/testing';
import { CiclosLectivosController } from './ciclos-lectivos.controller';

describe('CiclosLectivosController', () => {
  let controller: CiclosLectivosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CiclosLectivosController],
    }).compile();

    controller = module.get<CiclosLectivosController>(CiclosLectivosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
