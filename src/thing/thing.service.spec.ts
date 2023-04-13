import { ConsoleLogger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnotherThingSubscriber } from './anotherThing.subscriber';
import { Thing } from './thing.entity';
import { ThingService } from './thing.service';
import { ThingSubscriber } from './thing.subscriber';

describe('ThingService', () => {
  test('only afterUpdate', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'test.db',
          entities: [Thing],
          synchronize: true,
        }),
      ],
      providers: [ThingService, ThingSubscriber],
    })
      .setLogger(new ConsoleLogger())
      .compile();

    const service = module.get<ThingService>(ThingService);
    const subscriber = module.get<ThingSubscriber>(ThingSubscriber);
    const afterUpdate = jest.spyOn(subscriber, 'afterUpdate');

    const thing1 = await service.create({
      name: 'thing 1',
      count: 1,
    });
    thing1.count = 11;

    await service.update(thing1);

    expect(afterUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        updatedColumns: [expect.objectContaining({ databaseName: 'count' })],
      }),
    );

    await module.close();
  });

  test('with afterUpdate and beforeUpdate', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'test.db',
          entities: [Thing],
          synchronize: true,
        }),
      ],
      providers: [ThingService, AnotherThingSubscriber],
    })
      .setLogger(new ConsoleLogger())
      .compile();

    const service = module.get<ThingService>(ThingService);
    const subscriber = module.get<AnotherThingSubscriber>(
      AnotherThingSubscriber,
    );
    const afterUpdate = jest.spyOn(subscriber, 'afterUpdate');

    const thing1 = await service.create({
      name: 'thing 1',
      count: 1,
    });
    thing1.count = 11;

    await service.update(thing1);

    expect(afterUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        updatedColumns: [expect.objectContaining({ databaseName: 'count' })],
      }),
    );

    await module.close();
  });
});
