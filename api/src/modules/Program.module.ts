import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProgramController } from '../controllers/Program.controller';
import { Program } from '../entities/Program.entity';
import { ProgramType } from '../entities/ProgramType.entity';
import { ProgramService } from '../services/Program.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Program, ProgramType], 'mySqlConnection')
    ],
    providers: [ProgramService],
    controllers: [ProgramController],
    exports: [ProgramService]
})
export class ProgramModule {}
