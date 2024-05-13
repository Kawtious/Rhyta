import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GroupController } from '../controllers/Group.controller';
import { Course } from '../entities/Course.entity';
import { Group } from '../entities/Group.entity';
import { GroupService } from '../services/Group.service';

@Module({
    imports: [TypeOrmModule.forFeature([Group, Course], 'mySqlConnection')],
    providers: [GroupService],
    controllers: [GroupController],
    exports: [GroupService]
})
export class GroupModule {}
