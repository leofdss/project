import { Injectable } from '@nestjs/common';
import { Item, Message } from '@project/api-interfaces';
import { v4 } from 'uuid';

function delay(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, time);
  });
}

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
    delay(1000);
    return newItem;
  }

  async update(item: Item): Promise<Item> {
    const id = this.database.findIndex((e) => e.uuid === item.uuid);
    if (id !== -1) {
      this.database[id] = item;
    }
    delay(1000);
    return item;
  }

  async list(): Promise<Item[]> {
    delay(1000);
    return this.database;
  }

  async delete(uuid: string): Promise<void> {
    const id = this.database.findIndex((e) => e.uuid === uuid);
    if (id !== -1) {
      this.database.splice(id, 1);
    }
    delay(1000);
  }
}
