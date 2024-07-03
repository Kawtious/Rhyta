import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SemesterCareerController } from '../controllers/SemesterCareer.controller';
import { Career } from '../entities/Career.entity';
import { Course } from '../entities/Course.entity';
import { SemesterCareer } from '../entities/SemesterCareer.entity';
import { SemesterCareerService } from '../services/SemesterCareer.service';

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [Career, Course, SemesterCareer],
            'mySqlConnection'
        )
    ],
    providers: [SemesterCareerService],
    controllers: [SemesterCareerController],
    exports: [SemesterCareerService]
})
export class SemesterCareerModule {}
