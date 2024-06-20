import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
    DocumentBuilder,
    SwaggerDocumentOptions,
    SwaggerModule
} from '@nestjs/swagger';

import helmet from 'helmet';

import { CorsConfiguration } from './configuration/Cors.configuration';
import { HttpExceptionFilter } from './filters/HttpException.filter';
import { TypeORMExceptionFilter } from './filters/TypeORMException.filter';
import { AppModule } from './modules/App.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);

    app.enableCors(CorsConfiguration);

    app.use(helmet());

    const apiPath = 'rhyta/api';

    app.setGlobalPrefix(apiPath);

    app.enableVersioning({
        type: VersioningType.URI
    });

    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.useGlobalFilters(
        new HttpExceptionFilter(),
        new TypeORMExceptionFilter()
    );

    const options: SwaggerDocumentOptions = {
        operationIdFactory: (controllerKey: string, methodKey: string) =>
            methodKey
    };

    const config = new DocumentBuilder()
        .setTitle('Rhyta API')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config, options);

    SwaggerModule.setup(apiPath, app, document);

    const port = configService.get<number>('SERVER_PORT')!;

    return app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

(async () => {
    await bootstrap();
})();
