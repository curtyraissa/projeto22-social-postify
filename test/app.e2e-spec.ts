import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaModule } from '../src/prisma/prisma.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  //criando um modulo de teste a partir do modulo principal, AppModule
  //criando a aplicacao Nest a partir deste modulo de testes! o app
  //chamando a funcao init() que sobe a aplicacao nest para que eu possa testa-la
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe()); // validacao com os dtos a partir do class-validator
    prisma = app.get(PrismaService);

  // await prisma.media.deleteMany();
  // await prisma.post.deleteMany();
  // await prisma.publication.deleteMany();

    await app.init();
  });

  it('/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(HttpStatus.OK)
      .expect("I'm okay!");
  });
});
