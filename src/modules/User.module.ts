import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from '../controllers/User.controller';
import { User } from '../entities/User.entity';
import { UserService } from '../services/User.service';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([User], 'mySqlConnection')],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule {}
