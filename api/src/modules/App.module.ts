import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseConfiguration } from '../configuration/Database.configuration';
import { EnvConfiguration } from '../configuration/Env.configuration';
import { CareerModule } from './Career.module';
import { ClassroomModule } from './Classroom.module';
import { CourseModule } from './Course.module';
import { CycleModule } from './Cycle.module';
import { ExportModule } from './Export.module';
import { GroupModule } from './Group.module';
import { PathModule } from './Path.module';
import { ProfessorModule } from './Professor.module';
import { ProgramModule } from './Program.module';
import { ProgramTypeModule } from './ProgramType.module';
import { ScheduleModule } from './Schedule.module';
import { ScheduleEntryModule } from './ScheduleEntry.module';

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
        PathModule,
        ProfessorModule,
        ProgramModule,
        ProgramTypeModule,
        ScheduleModule,
        ScheduleEntryModule
    ]
})
export class AppModule {}
