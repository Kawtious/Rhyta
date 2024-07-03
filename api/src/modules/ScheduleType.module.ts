import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScheduleTypeController } from '../controllers/ScheduleType.controller';
import { ScheduleType } from '../entities/ScheduleType.entity';
import { ScheduleTypeService } from '../services/ScheduleType.service';

@Module({
    imports: [TypeOrmModule.forFeature([ScheduleType], 'mySqlConnection')],
    providers: [ScheduleTypeService],
    controllers: [ScheduleTypeController],
    exports: [ScheduleTypeService]
})
export class ScheduleTypeModule {}
