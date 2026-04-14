import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
    const duration = this.calculateDuration(dto.startTime, dto.endTime);
    const task = await this.taskModel.create({
      ...dto,
      duration,
      userId: new Types.ObjectId(userId),
      completed: dto.completed ?? false,
    });

    return this.serializeTask(task.toObject());
  }

  async update(userId: string, taskId: string, dto: UpdateTaskDto) {
    const existingTask = await this.taskModel.findOne({
      _id: taskId,
      userId: new Types.ObjectId(userId),
    });

    if (!existingTask) {
      throw new NotFoundException('Task not found.');
    }

    const startTime = dto.startTime ?? existingTask.startTime;
    const endTime = dto.endTime ?? existingTask.endTime;
    const duration = this.calculateDuration(startTime, endTime);

    const task = await this.taskModel.findOneAndUpdate(
      { _id: taskId, userId: new Types.ObjectId(userId) },
      { ...dto, duration },
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
    startTime: string;
    endTime: string;
    duration: number;
    completed: boolean;
  }) {
    return {
      id: String(task._id),
      title: task.title,
      category: task.category,
      energy: task.energy,
      date: task.date,
      startTime: task.startTime,
      endTime: task.endTime,
      duration: task.duration,
      completed: task.completed,
    };
  }

  private calculateDuration(startTime: string, endTime: string) {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    const startTotal = startHour * 60 + startMinute;
    const endTotal = endHour * 60 + endMinute;

    if (endTotal <= startTotal) {
      throw new BadRequestException('End time must be later than start time.');
    }

    return endTotal - startTotal;
  }
}
