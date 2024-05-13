import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScheduleController } from '../controllers/Schedule.controller';
import { Classroom } from '../entities/Classroom.entity';
import { Cycle } from '../entities/Cycle.entity';
import { Professor } from '../entities/Professor.entity';
import { Schedule } from '../entities/Schedule.entity';
import { ScheduleService } from '../services/Schedule.service';

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [Cycle, Classroom, Professor, Schedule],
            'mySqlConnection'
        )
    ],
    providers: [ScheduleService],
    controllers: [ScheduleController],
    exports: [ScheduleService]
})
export class ScheduleModule {}
