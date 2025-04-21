import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LinkedinService } from './linkedin.service';
import { LinkedinController } from './linkedin.controller';
import { LinkedinProfile, LinkedinProfileSchema } from './schemas/linkedin-profile.schema';
import { LinkedinLogger } from './utils/logger.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LinkedinProfile.name, schema: LinkedinProfileSchema }
    ])
  ],
  controllers: [LinkedinController],
  providers: [LinkedinService, LinkedinLogger]
})
export class LinkedinModule {}