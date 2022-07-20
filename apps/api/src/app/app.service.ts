import { Injectable } from '@nestjs/common';
import { Item, Message } from '@project/api-interfaces';
import { v4 } from 'uuid';

@Injectable()
export class AppService {
  database: Item[] = [];

  getData(): Message {
    return { message: 'Welcome to api!' };
  }

  async create(item: Item): Promise<Item> {
    const newItem = {
      ...item,
      uuid: v4(),
    };
    this.database.push(newItem);
    return newItem;
  }

  async update(item: Item): Promise<Item> {
    const id = this.database.findIndex((e) => e.uuid === item.uuid);
    if (id !== -1) {
      this.database[id] = item;
    }
    return item;
  }

  async list(): Promise<Item[]> {
    return this.database;
  }

  async delete(uuid: string): Promise<void> {
    const id = this.database.findIndex((e) => e.uuid === uuid);
    if (id !== -1) {
      this.database.slice(id, 1);
    }
  }
}
