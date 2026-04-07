import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Model, Types } from 'mongoose';
import { Task, TaskDocument } from '../tasks/schemas/task.schema';
import { User, UserDocument } from '../users/schemas/user.schema';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const email = dto.email.trim().toLowerCase();
    const existingUser = await this.userModel.findOne({ email });

    if (existingUser) {
      throw new BadRequestException('An account with this email already exists.');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.userModel.create({
      name: dto.name.trim(),
      email,
      passwordHash,
    });

    return this.buildAuthResponse(user);
  }

  async login(dto: LoginDto) {
    const email = dto.email.trim().toLowerCase();
    const user = await this.userModel.findOne({ email });

    if (!user?.passwordHash) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const isValid = await bcrypt.compare(dto.password, user.passwordHash);

    if (!isValid) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    return this.buildAuthResponse(user);
  }

  async validateUserById(userId: string) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return this.serializeUser(user);
  }

  async addCategory(userId: string, category: string) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const normalized = category.trim();

    if (!normalized) {
      throw new BadRequestException('Category is required.');
    }

    const exists = user.categories.some(
      (item) => item.toLowerCase() === normalized.toLowerCase(),
    );

    if (!exists) {
      user.categories.push(normalized);
      await user.save();
    }

    return this.serializeUser(user);
  }

  async removeCategory(userId: string, category: string) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const normalized = category.trim().toLowerCase();
    const usedByTask = await this.taskModel.exists({
      userId: new Types.ObjectId(userId),
      category: new RegExp(`^${escapeRegExp(category.trim())}$`, 'i'),
    });

    if (usedByTask) {
      throw new BadRequestException(
        'This category is still used by one or more tasks.',
      );
    }

    user.categories = user.categories.filter(
      (item) => item.trim().toLowerCase() !== normalized,
    );
    await user.save();

    return this.serializeUser(user);
  }

  private buildAuthResponse(user: UserDocument) {
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user: this.serializeUser(user),
    };
  }

  private serializeUser(user: UserDocument) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar ?? null,
      categories: user.categories,
    };
  }
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
