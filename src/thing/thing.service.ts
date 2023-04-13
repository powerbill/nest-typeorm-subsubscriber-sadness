import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Equal } from 'typeorm';
import { Thing } from './thing.entity';

@Injectable()
export class ThingService {
  constructor(@InjectDataSource() private readonly db: DataSource) {}

  async create(
    someThing: Omit<Thing, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<Thing> {
    return await this.db.transaction('SERIALIZABLE', async (mgr) => {
      const thing = mgr.create(Thing, {
        name: someThing.name,
        count: someThing.count,
      });
      return mgr.save(thing);
    });
  }

  async list(): Promise<Thing[]> {
    return await this.db.manager.find(Thing);
  }

  async update(someThing: Partial<Thing> & Pick<Thing, 'id'>): Promise<Thing> {
    return await this.db.transaction('SERIALIZABLE', async (mgr) => {
      const thing = await mgr.findOne(Thing, {
        where: {
          id: Equal(someThing.id),
        },
      });
      if (!thing) {
        throw new Error(`thing "${someThing.id}" does not exist`);
      }

      if (someThing.name) {
        thing.name = someThing.name;
      }
      if (someThing.count) {
        thing.count = someThing.count;
      }
      return mgr.save(thing);
    });
  }
}
