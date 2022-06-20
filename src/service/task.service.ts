import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from '../model/task.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async addTask(task: Task): Promise<Task> {
    const reqBody = {
      description: task.description,
      status: task.status,
      createdBy: task.createdBy,
    };
    const newUser = await new this.taskModel(reqBody);
    return newUser.save();
  }

  async updateTask(id: string, task: Task): Promise<Task> {
    return await this.taskModel
      .findByIdAndUpdate(id, task, { new: true })
      .exec();
  }

  async getListId(_id: any): Promise<Task[]> {
    return await this.taskModel.find({ createdBy: _id }).exec();
  }

  async getList(): Promise<Task[]> {
    return await this.taskModel.find().populate('createdBy').exec();
  }
}
