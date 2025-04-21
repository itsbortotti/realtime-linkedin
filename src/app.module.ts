import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LinkedinModule } from './linkedin/linkedin.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/Perfil_LK', {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }),
    LinkedinModule
  ],
})
export class AppModule {}
