import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CareerController } from '../controllers/Career.controller';
import { Career } from '../entities/Career.entity';
import { CareerService } from '../services/Career.service';

@Module({
    imports: [TypeOrmModule.forFeature([Career], 'mySqlConnection')],
    providers: [CareerService],
    controllers: [CareerController],
    exports: [CareerService]
})
export class CareerModule {}
