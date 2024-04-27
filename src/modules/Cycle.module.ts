import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CycleController } from '../controllers/Cycle.controller';
import { Cycle } from '../entities/Cycle.entity';
import { CycleService } from '../services/Cycle.service';

@Module({
    imports: [TypeOrmModule.forFeature([Cycle], 'mySqlConnection')],
    providers: [CycleService],
    controllers: [CycleController],
    exports: [CycleService]
})
export class CycleModule {}
