import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClassroomController } from '../controllers/Classroom.controller';
import { Classroom } from '../entities/Classroom.entity';
import { Schedule } from '../entities/Schedule.entity';
import { ClassroomService } from '../services/Classroom.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Classroom, Schedule], 'mySqlConnection')
    ],
    providers: [ClassroomService],
    controllers: [ClassroomController],
    exports: [ClassroomService]
})
export class ClassroomModule {}
