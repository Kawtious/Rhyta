import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExportController } from '../controllers/Export.controller';
import { Career } from '../entities/Career.entity';
import { Course } from '../entities/Course.entity';
import { Group } from '../entities/Group.entity';
import { Professor } from '../entities/Professor.entity';
import { Program } from '../entities/Program.entity';
import { ProgramType } from '../entities/ProgramType.entity';
import { ExportService } from '../services/Export.service';

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [Career, Course, Group, Professor, Program, ProgramType],
            'mySqlConnection'
        )
    ],
    providers: [ExportService],
    controllers: [ExportController],
    exports: [ExportService]
})
export class ExportModule {}
