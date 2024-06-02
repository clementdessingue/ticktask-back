import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from '../../src/tasks/tasks.service';
import { getModelToken } from '@nestjs/mongoose';

describe('TasksService', () => {
  let tasksService: TasksService;
  const exec = {
    exec: jest.fn()
  };
  const mockTaskModel = {
    create: jest.fn(),
    find: jest.fn().mockReturnValue(exec),
    findOneAndUpdate: jest.fn(),
    deleteOne: jest.fn().mockReturnValue(exec)
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getModelToken('Task'),
          useValue: mockTaskModel,
        },
      ],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
  });

  describe('root', () => {
    it('should create new task', async () => {
      const result = {
        title: 'taskTest',
        description: 'taskTestDescription',
        status: 'taskTestStatus'
      };
      
      jest.spyOn(mockTaskModel, 'create').mockResolvedValue(result);
      const taskCreated = await tasksService.create(result);

      expect(taskCreated.title).toBe(result.title);
      expect(taskCreated.description).toBe(result.description);
      expect(taskCreated.status).toBe(result.status);
      expect(mockTaskModel.create).toHaveBeenCalledWith(result);
      });

      it('should update existing task', async () => {
        const result = {
          _id: '665c60d9634170e5d9e6eddb',
          title: 'taskTest',
          description: 'taskTestDescription',
          status: 'taskTestStatus'
        };
        const { _id, ...task } = result;
        
        jest.spyOn(mockTaskModel, 'findOneAndUpdate').mockResolvedValue(result);
  
        await tasksService.update(result._id, task);
        expect(mockTaskModel.findOneAndUpdate).toHaveBeenCalledWith({ _id: result._id }, task, { upsert: true });
      })

      it('should find all tasks', async () => {
        const result = [
          { title: 'OK', description: 'DESC OK', status: 'En cours' }
        ];
        jest.spyOn(exec, 'exec').mockResolvedValueOnce(result);
    
        expect(await tasksService.findAll()).toBe(result);
        expect(mockTaskModel.find).toHaveBeenCalled();
      });

      it('should delete existing task', async () => {
        jest.spyOn(exec, 'exec').mockResolvedValueOnce(1)
        const result = await tasksService.deleteOne('665c60d9634170e5d9e6eddb');
        expect(result).toBe(1);
      });
  });
});