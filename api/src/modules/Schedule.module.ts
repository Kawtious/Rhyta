import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScheduleController } from '../controllers/Schedule.controller';
import { Schedule } from '../entities/Schedule.entity';
import { ScheduleType } from '../entities/ScheduleType.entity';
import { ScheduleService } from '../services/Schedule.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Schedule, ScheduleType], 'mySqlConnection')
    ],
    providers: [ScheduleService],
    controllers: [ScheduleController],
    exports: [ScheduleService]
})
export class ScheduleModule {}
