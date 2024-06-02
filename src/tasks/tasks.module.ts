import { DynamicModule, Module } from "@nestjs/common";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { Task, TaskSchema } from "./schemas/tasks.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({})
export class TasksModule {
  constructor() {}

  static register(): DynamicModule {
    return {
      module: TasksModule,
      imports: [MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }])],
      controllers: [TasksController],
      providers: [TasksService],
    };
  }
}