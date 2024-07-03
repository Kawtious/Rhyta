import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExportController } from '../controllers/Export.controller';
import { AvailabilitySchedule } from '../entities/AvailabilitySchedule.entity';
import { Career } from '../entities/Career.entity';
import { Classroom } from '../entities/Classroom.entity';
import { Course } from '../entities/Course.entity';
import { Group } from '../entities/Group.entity';
import { Professor } from '../entities/Professor.entity';
import { Schedule } from '../entities/Schedule.entity';
import { ScheduleType } from '../entities/ScheduleType.entity';
import { SemesterCareer } from '../entities/SemesterCareer.entity';
import { ExportService } from '../services/Export.service';

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [
                Career,
                Classroom,
                Course,
                Group,
                SemesterCareer,
                Professor,
                Schedule,
                ScheduleType,
                AvailabilitySchedule
            ],
            'mySqlConnection'
        )
    ],
    providers: [ExportService],
    controllers: [ExportController],
    exports: [ExportService]
})
export class ExportModule {}
