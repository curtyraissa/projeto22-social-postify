import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaModule } from '../src/prisma/prisma.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { faker } from '@faker-js/faker';
import { Helper } from './helpers';
import { Factories } from './factory';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let helper: Helper;
  let factories: Factories;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    prisma = moduleFixture.get<PrismaService>(PrismaService);
    factories = new Factories();
    helper = new Helper();
  });

  it('/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(HttpStatus.OK)
      .expect("I'm okay!");
  });
  
  describe('MediaController', () => {
    // test cases
  });
  
  describe('PostController', () => {
    //  test cases
  });
  
  describe('PublicationController', () => {
    //  test cases
  });

  afterAll(async () => {
    await app.close();
  });
});
