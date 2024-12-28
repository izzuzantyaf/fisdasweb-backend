import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoService } from './mongo.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([]),
    MongooseModule.forRoot(process.env.MONGO_URI || ''),
  ],
  providers: [MongoService],
  exports: [MongoService],
})
export class MongoModule {}
