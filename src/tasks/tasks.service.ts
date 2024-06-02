import { Injectable } from '@nestjs/common';
import { Task } from './schemas/tasks.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private taskModel: Model<Task>) {}

  async create(task: Task): Promise<Task> {
    const taskToCreate = {
        title: task.title,
        description: task.description,
        status: task.status
    }
    return await this.taskModel.create({...taskToCreate});
  }

  async update(taskId: string, task: Task): Promise<Task> {
    const taskToUpsert = {
      title: task.title,
      description: task.description,
      status: task.status
    }
    return this.taskModel.findOneAndUpdate({ _id: taskId }, { ...taskToUpsert }, { upsert: true });
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async deleteOne(taskId: string) {
    return this.taskModel.deleteOne({ _id: taskId }).exec();
  }
}