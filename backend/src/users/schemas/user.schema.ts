import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email!: string;

  @Prop()
  passwordHash?: string;

  @Prop()
  avatar?: string;

  @Prop({
    type: [String],
    default: ['Study', 'Work', 'Personal', 'Health'],
  })
  categories!: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
