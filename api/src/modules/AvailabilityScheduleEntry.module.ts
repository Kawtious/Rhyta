import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AvailabilityScheduleEntryController } from '../controllers/AvailabilityScheduleEntry.controller';
import { AvailabilitySchedule } from '../entities/AvailabilitySchedule.entity';
import { AvailabilityScheduleEntry } from '../entities/AvailabilityScheduleEntry.entity';
import { AvailabilityScheduleEntryService } from '../services/AvailabilityScheduleEntry.service';

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [AvailabilitySchedule, AvailabilityScheduleEntry],
            'mySqlConnection'
        )
    ],
    providers: [AvailabilityScheduleEntryService],
    controllers: [AvailabilityScheduleEntryController],
    exports: [AvailabilityScheduleEntryService]
})
export class AvailabilityScheduleEntryModule {}
