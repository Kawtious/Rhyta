import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PathController } from '../controllers/Path.controller';
import { Career } from '../entities/Career.entity';
import { Course } from '../entities/Course.entity';
import { Path } from '../entities/Path.entity';
import { PathService } from '../services/Path.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Career, Course, Path], 'mySqlConnection')
    ],
    providers: [PathService],
    controllers: [PathController],
    exports: [PathService]
})
export class PathModule {}
