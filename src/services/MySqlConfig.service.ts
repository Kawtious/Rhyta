import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Injectable()
export class MySqlConfigService implements TypeOrmOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: this.configService.get<string>('MYSQL_HOST'),
            port: this.configService.get<number>('MYSQL_PORT'),
            username: this.configService.get<string>('MYSQL_USER'),
            password: this.configService.get<string>('MYSQL_PASSWORD'),
            database: this.configService.get<string>('MYSQL_NAME'),
            synchronize: this.configService.get<boolean>('MYSQL_SYNCHRONIZE'),
            keepConnectionAlive: true,
            autoLoadEntities: true,
            namingStrategy: new SnakeNamingStrategy(),
            logging: false
        };
    }
}
