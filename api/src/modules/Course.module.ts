import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CourseController } from '../controllers/Course.controller';
import { Classroom } from '../entities/Classroom.entity';
import { Course } from '../entities/Course.entity';
import { CourseService } from '../services/Course.service';

@Module({
    imports: [TypeOrmModule.forFeature([Classroom, Course], 'mySqlConnection')],
    providers: [CourseService],
    controllers: [CourseController],
    exports: [CourseService]
})
export class CourseModule {}
