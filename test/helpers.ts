import { PrismaService } from "../src/prisma/prisma.service";

export class Helper {
    async cleanDB(prisma: PrismaService) {
      await prisma.publication.deleteMany({});
      await prisma.media.deleteMany({});
      await prisma.post.deleteMany({});
    }
  }
