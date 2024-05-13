import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExportController } from '../controllers/Export.controller';
import { Career } from '../entities/Career.entity';
import { Classroom } from '../entities/Classroom.entity';
import { Course } from '../entities/Course.entity';
import { Group } from '../entities/Group.entity';
import { Path } from '../entities/Path.entity';
import { Professor } from '../entities/Professor.entity';
import { Program } from '../entities/Program.entity';
import { ProgramType } from '../entities/ProgramType.entity';
import { Schedule } from '../entities/Schedule.entity';
import { ExportService } from '../services/Export.service';

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [
                Career,
                Classroom,
                Course,
                Group,
                Path,
                Professor,
                Program,
                ProgramType,
                Schedule
            ],
            'mySqlConnection'
        )
    ],
    providers: [ExportService],
    controllers: [ExportController],
    exports: [ExportService]
})
export class ExportModule {}
