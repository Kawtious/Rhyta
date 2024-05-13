import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { JwtConfiguration } from '../configuration/Jwt.configuration';
import { AuthController } from '../controllers/Auth.controller';
import { AuthService } from '../services/Auth.service';
import { UserModule } from './User.module';

@Global()
@Module({
    imports: [
        UserModule,
        JwtModule.registerAsync(JwtConfiguration),
        ConfigModule
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService, JwtModule]
})
export class AuthModule {}
