// 3rdparty
import { Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, EntitySubscriberInterface, UpdateEvent } from 'typeorm';

// local
import { Thing } from './thing.entity';

export class AnotherThingSubscriber
  implements EntitySubscriberInterface<Thing>
{
  private readonly logger: Logger = new Logger(AnotherThingSubscriber.name);

  constructor(@InjectDataSource() db: DataSource) {
    db.subscribers.push(this);
  }

  listenTo(): string | Function {
    return Thing;
  }

  beforeUpdate(event: UpdateEvent<Thing>): void | Promise<any> {
    this.logger.log(`triggering "beforeUpdate"`);
  }

  afterUpdate({ updatedColumns }: UpdateEvent<Thing>): void | Promise<any> {
    this.logger.log(`triggering "afterUpdate"`, {
      updatedColumnNames: updatedColumns.map((col) => col.databaseName),
    });
  }
}
