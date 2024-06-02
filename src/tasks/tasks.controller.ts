import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './schemas/tasks.schema';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getTasks(): Promise<Array<Task>> {
    const tasks = await this.tasksService.findAll();
    return tasks;
  }

  @Post(':id')
  async updateTask(@Param('id') taskId: string, @Body() task: Task) {
    let taskUpdated = {} as Task;
    if(taskId) {
      taskUpdated = await this.tasksService.update(taskId, task);
    }
    return taskUpdated;
  }

  @Post()
  async insertTask(@Body() task: Task): Promise<Task> {
    return await this.tasksService.create(task);
  }

  @Delete(':id')
  async deleteTask(@Param('id') taskId: string) {
    const response = await this.tasksService.deleteOne(taskId);
    return response.deletedCount;
  }
}
