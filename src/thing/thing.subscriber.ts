// 3rdparty
import { Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, EntitySubscriberInterface, UpdateEvent } from 'typeorm';

// local
import { Thing } from './thing.entity';

export class ThingSubscriber implements EntitySubscriberInterface<Thing> {
  private readonly logger: Logger = new Logger(ThingSubscriber.name);

  constructor(@InjectDataSource() db: DataSource) {
    db.subscribers.push(this);
  }

  listenTo(): string | Function {
    return Thing;
  }

  afterUpdate({ updatedColumns }: UpdateEvent<Thing>): void | Promise<any> {
    this.logger.log(`triggering "afterUpdate"`, {
      updatedColumnNames: updatedColumns.map((col) => col.databaseName),
    });
  }
}
