import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScheduleEntryController } from '../controllers/ScheduleEntry.controller';
import { Schedule } from '../entities/Schedule.entity';
import { ScheduleEntry } from '../entities/ScheduleEntry.entity';
import { ScheduleEntryService } from '../services/ScheduleEntry.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Schedule, ScheduleEntry], 'mySqlConnection')
    ],
    providers: [ScheduleEntryService],
    controllers: [ScheduleEntryController],
    exports: [ScheduleEntryService]
})
export class ScheduleEntryModule {}
