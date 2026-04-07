import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskDocument } from './schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
  ) {}

  async findAllByUser(userId: string) {
    const tasks = await this.taskModel
      .find({ userId: new Types.ObjectId(userId) })
      .sort({ completed: 1, date: 1, createdAt: -1 })
      .lean();

    return tasks.map((task) => this.serializeTask(task));
  }

  async create(userId: string, dto: CreateTaskDto) {
    const task = await this.taskModel.create({
      ...dto,
      userId: new Types.ObjectId(userId),
      completed: dto.completed ?? false,
    });

    return this.serializeTask(task.toObject());
  }

  async update(userId: string, taskId: string, dto: UpdateTaskDto) {
    const task = await this.taskModel.findOneAndUpdate(
      { _id: taskId, userId: new Types.ObjectId(userId) },
      dto,
      { new: true },
    );

    if (!task) {
      throw new NotFoundException('Task not found.');
    }

    return this.serializeTask(task.toObject());
  }

  async remove(userId: string, taskId: string) {
    const task = await this.taskModel.findOneAndDelete({
      _id: taskId,
      userId: new Types.ObjectId(userId),
    });

    if (!task) {
      throw new NotFoundException('Task not found.');
    }

    return { success: true };
  }

  private serializeTask(task: {
    _id: Types.ObjectId | string;
    title: string;
    category: string;
    energy: 'Low' | 'Medium' | 'High';
    date: string;
    completed: boolean;
  }) {
    return {
      id: String(task._id),
      title: task.title,
      category: task.category,
      energy: task.energy,
      date: task.date,
      completed: task.completed,
    };
  }
}
