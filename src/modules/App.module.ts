import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import Joi from 'joi';

import { AuthGuard } from '../guards/Auth.guard';
import { MySqlConfigService } from '../services/MySqlConfig.service';
import { AuthModule } from './Auth.module';
import { CareerModule } from './Career.module';
import { CourseModule } from './Course.module';
import { ProfessorModule } from './Professor.module';
import { ProfessorEventModule } from './ProfessorEvent.module';
import { TermModule } from './Term.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            validationSchema: Joi.object({
                NODE_ENV: Joi.string()
                    .valid('development', 'production', 'test', 'provision')
                    .default('development'),
                SERVER_PORT: Joi.number().port().default(3000),
                JWT_SECRET: Joi.string().required(),
                JWT_EXPIRATION: Joi.string().default('1h'),
                MYSQL_HOST: Joi.string().default('localhost'),
                MYSQL_PORT: Joi.number().port().default(3306),
                MYSQL_USER: Joi.string().default('root'),
                MYSQL_PASSWORD: Joi.string().default('password'),
                MYSQL_NAME: Joi.string().default('mydb'),
                MYSQL_SYNCHRONIZE: Joi.boolean().default(true)
            }),
            validationOptions: {
                allowUnknown: true,
                abortEarly: true
            }
        }),
        TypeOrmModule.forRootAsync({
            name: 'mySqlConnection',
            useClass: MySqlConfigService
        }),
        AuthModule,
        CareerModule,
        CourseModule,
        ProfessorModule,
        ProfessorEventModule,
        TermModule
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        }
    ]
})
export class AppModule {}
