import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClassroomController } from '../controllers/Classroom.controller';
import { AvailabilitySchedule } from '../entities/AvailabilitySchedule.entity';
import { Classroom } from '../entities/Classroom.entity';
import { ClassroomService } from '../services/Classroom.service';

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [Classroom, AvailabilitySchedule],
            'mySqlConnection'
        )
    ],
    providers: [ClassroomService],
    controllers: [ClassroomController],
    exports: [ClassroomService]
})
export class ClassroomModule {}
