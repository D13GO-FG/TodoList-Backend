import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './model/user.schema';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { isAuthenticated } from './app.middleware';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { secret } from './utils/constants';
import { join } from 'path/posix';
import { TaskController } from './controller/task.controller';
import { Task, TaskSchema } from './model/task.schema';
import { TaskService } from './service/task.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/todolist'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    JwtModule.register({
      secret,
      signOptions: { expiresIn: '2h' },
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'public'),
    // }),
  ],
  controllers: [AppController, UserController, TaskController],
  providers: [AppService, UserService, TaskService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(isAuthenticated)
      .exclude({ path: 'api/v1/task/:id', method: RequestMethod.GET })
      .forRoutes(TaskController);
  }
}
