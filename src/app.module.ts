import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import { UploadModule } from './upload/upload.module';
//
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/game'),
    GameModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
