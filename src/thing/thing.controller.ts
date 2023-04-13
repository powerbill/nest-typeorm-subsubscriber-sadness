import {
    Body,
    Controller,
    Get,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';
import { Thing } from './thing.entity';
import { ThingService } from './thing.service';

export class CreateThingDTO {
  @IsNotEmpty()
  name: string;

  @IsPositive()
  count: number;
}

export class UpdateThingDTO {
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsPositive()
  count?: number;
}

@Controller('thing')
@UsePipes(new ValidationPipe({ transform: true }))
export class ThingController {
  constructor(private readonly thingService: ThingService) {}

  @Get()
  async listThings(): Promise<Thing[]> {
    return this.thingService.list();
  }

  @Post()
  async createThing(@Body() someThing: CreateThingDTO): Promise<Thing> {
    return this.thingService.create(someThing);
  }

  @Patch(':id')
  async updateThing(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() someThing: UpdateThingDTO,
  ): Promise<Thing> {
    return this.thingService.update({
      ...someThing,
      id,
    });
  }
}
