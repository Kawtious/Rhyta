import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProfessorEventController } from '../controllers/ProfessorEvent.controller';
import { Professor } from '../entities/Professor.entity';
import { ProfessorEvent } from '../entities/ProfessorEvent.entity';
import { ProfessorEventService } from '../services/ProfessorEvent.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProfessorEvent, Professor], 'mySqlConnection')
    ],
    providers: [ProfessorEventService],
    controllers: [ProfessorEventController],
    exports: [ProfessorEventService]
})
export class ProfessorEventModule {}
