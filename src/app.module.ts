import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TasksModule.register(),
    MongooseModule.forRoot(`${process.env.DB_HOST}/ticktask-dev`)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
