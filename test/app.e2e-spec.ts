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
  
  describe('Media', () => {
    let app: INestApplication;
  let createdMediaId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/medias (POST)', async () => {
    const mediaData = {
      title: faker.person.firstName(),
      username: faker.internet.url(),
    };

    const response = await request(app.getHttpServer())
      .post('/medias')
      .send(mediaData)
      .expect(201);

    createdMediaId = response.body.id;

    expect(response.body.title).toBe(mediaData.title);
    expect(response.body.username).toBe(mediaData.username);
  });
  it('/medias (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/medias')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });
  it('/medias/:id (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get(`/medias/${createdMediaId}`)
      .expect(200);

    expect(response.body.id).toBe(createdMediaId);
  });
  it('/medias/:id (PUT)', async () => {
    const updatedMediaData = {
      title: faker.person.firstName(),
      username: faker.internet.url(),
    };

    const response = await request(app.getHttpServer())
      .put(`/medias/${createdMediaId}`)
      .send(updatedMediaData)
      .expect(200);

    expect(response.body.title).toBe(updatedMediaData.title);
    expect(response.body.username).toBe(updatedMediaData.username);
  });

  it('/medias/:id (DELETE)', async () => {
    await request(app.getHttpServer())
      .delete(`/medias/${createdMediaId}`)
      .expect(204);
  });
  });
  });
  
  describe('Post', () => {
    let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prismaService = moduleFixture.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await app.close();
  });
  describe('/posts (POST)', () => {
    it('should create a new post', async () => {
      const response = await request(app.getHttpServer())
        .post('/posts')
        .send({
          title: faker.person.firstName(),
          text: faker.person.firstName(),
        })
        .expect(HttpStatus.CREATED);
        expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          text: expect.any(String),
        }),
      );
    });

    it('should return 400 if required fields are missing', async () => {
      await request(app.getHttpServer())
        .post('/posts')
        .send({
          title: faker.person.firstName(),
        })
        .expect(HttpStatus.BAD_REQUEST);
    });
  });
  describe('/posts (GET)', () => {
    it('should return an array of posts', async () => {
      const response = await request(app.getHttpServer())
        .get('/posts')
        .expect(HttpStatus.OK);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });
  describe('/posts/:id (GET)', () => {
    it('should return a single post by ID', async () => {
      const posts = await prismaService.post.findMany();
      const postId = posts[0].id;

      const response = await request(app.getHttpServer())
        .get(`/posts/${postId}`)
        .expect(HttpStatus.OK);

      expect(response.body).toHaveProperty('id', postId);
    });
    describe('/posts/:id (PUT)', () => {
      it('should update a post by ID', async () => {
        const posts = await prismaService.post.findMany();
        const postId = posts[0].id;
  
        const response = await request(app.getHttpServer())
          .put(`/posts/${postId}`)
          .send({
            title: 'Updated Title',
          })
          .expect(HttpStatus.OK);
  
        expect(response.body).toHaveProperty('title', 'Updated Title');
      });
  
      describe('/posts/:id (DELETE)', () => {
        it('should delete a post by ID', async () => {
          const posts = await prismaService.post.findMany();
          const postId = posts[0].id;
    
          await request(app.getHttpServer())
            .delete(`/posts/${postId}`)
            .expect(HttpStatus.OK);
        });
      });
  });
  
  describe('Publication', () => {
    //  test cases
  });

  afterAll(async () => {
    await app.close();
  });
});
});
