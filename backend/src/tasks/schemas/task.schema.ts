import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema({ timestamps: true })
export class Task {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId!: Types.ObjectId;

  @Prop({ required: true, trim: true })
  title!: string;

  @Prop({ required: true, trim: true })
  category!: string;

  @Prop({ required: true, enum: ['Low', 'Medium', 'High'] })
  energy!: 'Low' | 'Medium' | 'High';

  @Prop({ required: true })
  date!: string;

  @Prop({ required: true })
  startTime!: string;

  @Prop({ required: true })
  endTime!: string;

  @Prop({ required: true, min: 1 })
  duration!: number;

  @Prop({ default: false })
  completed!: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
