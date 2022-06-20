import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop()
  description: string;

  @Prop()
  status: string;

  @Prop({ default: Date.now() })
  endDate: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
