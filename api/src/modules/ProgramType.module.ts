import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProgramTypeController } from '../controllers/ProgramType.controller';
import { ProgramType } from '../entities/ProgramType.entity';
import { ProgramTypeService } from '../services/ProgramType.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProgramType], 'mySqlConnection')],
    providers: [ProgramTypeService],
    controllers: [ProgramTypeController],
    exports: [ProgramTypeService]
})
export class ProgramTypeModule {}
