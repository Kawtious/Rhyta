import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AvailabilityScheduleController } from '../controllers/AvailabilitySchedule.controller';
import { AvailabilitySchedule } from '../entities/AvailabilitySchedule.entity';
import { Classroom } from '../entities/Classroom.entity';
import { Cycle } from '../entities/Cycle.entity';
import { Professor } from '../entities/Professor.entity';
import { AvailabilityScheduleService } from '../services/AvailabilitySchedule.service';

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [Cycle, Classroom, Professor, AvailabilitySchedule],
            'mySqlConnection'
        )
    ],
    providers: [AvailabilityScheduleService],
    controllers: [AvailabilityScheduleController],
    exports: [AvailabilityScheduleService]
})
export class AvailabilityScheduleModule {}
