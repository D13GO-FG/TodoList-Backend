import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UploadedFiles,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Task } from 'src/model/task.schema';
import { TaskService } from 'src/service/task.service';

@Controller('/api/v1/task')
export class TaskController {
  constructor(private readonly taskServerice: TaskService) {}

  @Get('/')
  async read() {
    return await this.taskServerice.getList();
  }

  @Get('/:id')
  async readId(@Param('id') id: string) {
    return await this.taskServerice.getListId(id);
  }

  @Post('/addTask')
  async addTask(@Res() response, @Body() task: Task) {
    console.log(task);
    const newTask = await this.taskServerice.addTask(task);
    return response.status(HttpStatus.CREATED).json({
      newTask,
    });
  }

  @Put('/updateStatus/:id')
  async updateStatus(
    @Param('id') id: string,
    @Res() response,
    @Body() task: Task,
  ) {
    const newStatus = await this.taskServerice.updateTask(id, task);
    return response.status(HttpStatus.OK).json(newStatus);
  }
}
