import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TermController } from '../controllers/Term.controller';
import { Term } from '../entities/Term.entity';
import { TermService } from '../services/Term.service';

@Module({
    imports: [TypeOrmModule.forFeature([Term], 'mySqlConnection')],
    providers: [TermService],
    controllers: [TermController],
    exports: [TermService]
})
export class TermModule {}
