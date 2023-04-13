import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Thing } from './thing/thing.entity';
import { ThingModule } from './thing/thing.module';

@Module({
  imports: [
    ThingModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'thing.db',
      entities: [Thing],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
