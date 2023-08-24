import { Module } from '@nestjs/common';
import { PublicationService } from './publications.service';
import { PublicationController } from './publications.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PublicationRepository } from './publications.repository';

@Module({
  controllers: [PublicationController],
  providers: [PublicationService, PublicationRepository],
  exports: [PublicationService],
  imports: [PrismaModule],
})
export class PublicationModule {}
