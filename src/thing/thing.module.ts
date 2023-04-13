import { Module } from '@nestjs/common';
import { AnotherThingSubscriber } from './anotherThing.subscriber';
import { ThingController } from './thing.controller';
import { ThingSubscriber } from './thing.subscriber';
import { ThingService } from './thing.service';

@Module({
  providers: [ThingSubscriber, AnotherThingSubscriber, ThingService],
  controllers: [ThingController],
})
export class ThingModule {}
