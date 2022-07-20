import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { Item, Resp } from '@project/api-interfaces';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async create(@Body() item: Item): Promise<Item> {
    return await this.appService.create(item);
  }

  @Put()
  async update(@Body() item: Item): Promise<Item> {
    return await this.appService.update(item);
  }

  @Get()
  async list(): Promise<Item[]> {
    return await this.appService.list();
  }

  @Get('/:uuid')
  async getOne(@Param('uuid') uuid: string) {
    const result = await this.appService.getOne(uuid);
    if (result) {
      return result;
    }
    throw new NotFoundException();
  }

  @Delete('/:uuid')
  async delete(@Param('uuid') uuid: string): Promise<Resp> {
    await this.appService.delete(uuid);
    return { result: 'ok' };
  }
}
