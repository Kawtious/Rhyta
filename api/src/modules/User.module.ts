import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from '../controllers/User.controller';
import { Role } from '../entities/Role.entity';
import { User } from '../entities/User.entity';
import { UserService } from '../services/User.service';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([Role, User], 'mySqlConnection')],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule {}
