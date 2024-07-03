import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseConfiguration } from '../configuration/Database.configuration';
import { EnvConfiguration } from '../configuration/Env.configuration';
import { AvailabilityScheduleModule } from './AvailabilitySchedule.module';
import { AvailabilityScheduleEntryModule } from './AvailabilityScheduleEntry.module';
import { CareerModule } from './Career.module';
import { ClassroomModule } from './Classroom.module';
import { CourseModule } from './Course.module';
import { CycleModule } from './Cycle.module';
import { ExportModule } from './Export.module';
import { GroupModule } from './Group.module';
import { ProfessorModule } from './Professor.module';
import { ScheduleModule } from './Schedule.module';
import { ScheduleTypeModule } from './ScheduleType.module';
import { SemesterCareerModule } from './SemesterCareer.module';

@Module({
    imports: [
        ConfigModule.forRoot(EnvConfiguration),
        TypeOrmModule.forRootAsync({
            name: 'mySqlConnection',
            useClass: DatabaseConfiguration
        }),
        CareerModule,
        ClassroomModule,
        CourseModule,
        CycleModule,
        ExportModule,
        GroupModule,
        SemesterCareerModule,
        ProfessorModule,
        ScheduleModule,
        ScheduleTypeModule,
        AvailabilityScheduleModule,
        AvailabilityScheduleEntryModule
    ]
})
export class AppModule {}
