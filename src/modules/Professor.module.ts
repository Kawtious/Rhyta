import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProfessorController } from '../controllers/Professor.controller';
import { Professor } from '../entities/Professor.entity';
import { ProfessorService } from '../services/Professor.service';

@Module({
    imports: [TypeOrmModule.forFeature([Professor], 'mySqlConnection')],
    providers: [ProfessorService],
    controllers: [ProfessorController],
    exports: [ProfessorService]
})
export class ProfessorModule {}
