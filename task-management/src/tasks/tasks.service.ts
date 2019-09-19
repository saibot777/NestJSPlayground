import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  public async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const tasks = await this.taskRepository.getTasks(filterDto);
    return tasks;
  }

  public async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne(id);

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  public async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  public async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();

    return task;
  }

  public async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    console.log(result);
  }
}
