import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaModule } from '../src/prisma/prisma.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { faker } from '@faker-js/faker';
import { Helper } from './helpers';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let helper: Helper;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    prisma = moduleFixture.get<PrismaService>(PrismaService);
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
    let app: INestApplication;
    let prismaService: PrismaService;
  
    beforeAll(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
  
      app = moduleFixture.createNestApplication();
      prismaService = moduleFixture.get<PrismaService>(PrismaService);
  
      await app.init();
    });
  
    afterAll(async () => {
      await app.close();
    });
  
    describe('POST /publications', () => {
      it('should return 400 Bad Request if required fields are missing', async () => {
        const response = await request(app.getHttpServer())
          .post('/publications')
          .send({})
          .expect(HttpStatus.BAD_REQUEST);
  
        expect(response.body.message).toEqual('Missing required fields');
      });
  
      it('should return 404 Not Found if mediaId or postId does not exist', async () => {
        const response = await request(app.getHttpServer())
          .post('/publications')
          .send({ mediaId: 999, postId: 999, date: '2023-08-21T13:25:17.352Z' })
          .expect(HttpStatus.NOT_FOUND);
  
        expect(response.body.message).toEqual('Media not found');
      });
    });
    describe('GET /publications', () => {
      it('should return all publications', async () => {
        const response = await request(app.getHttpServer())
          .get('/publications')
          .expect(HttpStatus.OK);
  
        expect(response.body).toBeDefined();
        expect(Array.isArray(response.body)).toBeTruthy();
      });
    });
  
    describe('GET /publications/:id', () => {
      it('should return a publication by ID', async () => {
        const publication = await prismaService.publication.findFirst();
        const response = await request(app.getHttpServer())
          .get(`/publications/${publication.id}`)
          .expect(HttpStatus.OK);
  
        expect(response.body).toBeDefined();
        expect(response.body.id).toEqual(publication.id);
      });
  
      it('should return 404 Not Found if publication does not exist', async () => {
        const response = await request(app.getHttpServer())
          .get('/publications/999')
          .expect(HttpStatus.NOT_FOUND);
  
        expect(response.body.message).toEqual('Publication not found');
      });
    });
    describe('PUT /publications/:id', () => {
      it('should update a scheduled publication', async () => {
        const publication = await prismaService.publication.findFirst({ where: { published: false } });
        const updatedDate = '2023-09-21T13:25:17.352Z';
  
        const response = await request(app.getHttpServer())
          .put(`/publications/${publication.id}`)
          .send({ date: updatedDate })
          .expect(HttpStatus.OK);
  
        expect(response.body).toBeDefined();
        expect(response.body.date).toEqual(updatedDate);
      });
  
      it('should return 404 Not Found if publication does not exist', async () => {
        const response = await request(app.getHttpServer())
          .put('/publications/999')
          .send({ date: '2023-09-21T13:25:17.352Z' })
          .expect(HttpStatus.NOT_FOUND);
  
        expect(response.body.message).toEqual('Publication not found');
      });
    });
    describe('DELETE /publications/:id', () => {
      it('should delete a publication', async () => {
        const publication = await prismaService.publication.findFirst();
        await request(app.getHttpServer())
      });
    });
    });

  afterAll(async () => {
    await app.close();
  });
});
  });
