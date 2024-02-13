import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CourseController } from '../controllers/Course.controller';
import { Career } from '../entities/Career.entity';
import { Course } from '../entities/Course.entity';
import { CourseService } from '../services/Course.service';

@Module({
    imports: [TypeOrmModule.forFeature([Course, Career], 'mySqlConnection')],
    providers: [CourseService],
    controllers: [CourseController],
    exports: [CourseService]
})
export class CourseModule {}
