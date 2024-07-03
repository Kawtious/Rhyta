import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProfessorController } from '../controllers/Professor.controller';
import { AvailabilitySchedule } from '../entities/AvailabilitySchedule.entity';
import { AvailabilityScheduleEntry } from '../entities/AvailabilityScheduleEntry.entity';
import { Professor } from '../entities/Professor.entity';
import { ProfessorService } from '../services/Professor.service';

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [Professor, AvailabilitySchedule, AvailabilityScheduleEntry],
            'mySqlConnection'
        )
    ],
    providers: [ProfessorService],
    controllers: [ProfessorController],
    exports: [ProfessorService]
})
export class ProfessorModule {}
