import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, userDocument } from './models/User';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name)
    private readonly user: Model<userDocument>,
  ) {}

  async insertOne(data: Partial<User>): Promise<User> {
    const user = new this.user(data);
    return user.save();
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.user.findOne({ email });
  }

  async findOneById(userId: string): Promise<User> {
    return this.user.findById(userId);
  }
}
