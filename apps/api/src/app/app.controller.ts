import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { Item, Message } from '@project/api-interfaces';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getData(): Message {
    return this.appService.getData();
  }

  @Post()
  async create(@Body() item: Item) {
    return await this.appService.create(item);
  }

  @Put()
  async update(@Body() item: Item) {
    return await this.appService.update(item);
  }

  @Get()
  async list(): Promise<Item[]> {
    return await this.appService.list();
  }

  @Delete('/:uuid')
  async delete(@Param('uuid') uuid: string) {
    return await this.appService.delete(uuid);
  }
}
